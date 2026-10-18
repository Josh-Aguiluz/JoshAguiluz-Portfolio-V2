import type { SectionTarget } from '../data/assistant';

export type AIResult =
  | { status: 'ok'; text: string; go: SectionTarget | null }
  /** Groq's daily allowance is used up (show the "come back tomorrow" note). */
  | { status: 'limit' }
  /** Anything else: not deployed, offline, busy, slow, error. Fall back to the scripted bot silently. */
  | { status: 'unavailable' };

const ENDPOINT = '/api/chat';
const TIMEOUT_MS = 12_000;
const LIMIT_KEY = 'chat-ai-limit-until';

const SECTIONS: SectionTarget[] = ['home', 'about', 'skills-title', 'certifications-title', 'projects', 'resume', 'blog', 'contact'];

/** Next 00:00 UTC, when Groq's daily limit resets. */
function nextUtcMidnight() {
  const d = new Date();
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1);
}

/** True while the AI is paused because the daily limit was hit (until the next reset). */
export function aiPaused(): boolean {
  try {
    return Date.now() < Number(sessionStorage.getItem(LIMIT_KEY) ?? 0);
  } catch {
    return false;
  }
}

function pauseUntilReset() {
  try {
    sessionStorage.setItem(LIMIT_KEY, String(nextUtcMidnight()));
  } catch {
    /* storage unavailable: the limit note simply shows again next time */
  }
}

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

/** Dev-only hint explaining why the free bot answered instead of the AI. */
function devHint(reason: string) {
  if (import.meta.env.DEV) console.info(`[chat] Using the free bot: ${reason}`);
}

export async function askAI(history: ChatTurn[]): Promise<AIResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: history }),
      signal: controller.signal,
    });
    if (!(res.headers.get('content-type') ?? '').includes('application/json')) {
      devHint('no /api/chat function here. Restart `npm run dev`, or deploy to Netlify.');
      return { status: 'unavailable' };
    }
    const data = await res.json();

    if (res.ok && typeof data.reply === 'string' && data.reply) {
      const go = SECTIONS.includes(data.go) ? (data.go as SectionTarget) : null;
      return { status: 'ok', text: data.reply, go };
    }
    if (res.status === 429 && data.error === 'limit') {
      pauseUntilReset();
      return { status: 'limit' };
    }
    devHint(data.error === 'not_configured' ? 'GROQ_API_KEY is missing. Add it to .env and restart `npm run dev`.' : `the AI returned "${data.error ?? res.status}".`);
    return { status: 'unavailable' };
  } catch {
    devHint('the request failed or timed out.');
    return { status: 'unavailable' };
  } finally {
    clearTimeout(timer);
  }
}
