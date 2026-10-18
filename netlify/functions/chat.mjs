/**
 * Netlify Function: POST /api/chat
 *
 * Forwards a short conversation to Groq and returns the reply. The API key lives only in the
 * Netlify environment (GROQ_API_KEY); it is never sent to the browser.
 *
 * Responses (JSON):
 *   200 { reply, go }            go = a section id to offer a "Go to" button for, or null
 *   429 { error: 'limit' }       Groq's DAILY allowance is used up (the site shows the "come back tomorrow" note)
 *   429 { error: 'rate' }        this visitor is sending too fast, or Groq is briefly busy
 *   4xx/5xx { error: ... }       anything else; the site silently falls back to the free scripted bot
 */
import { SECTION_IDS, SYSTEM_PROMPT } from './chat-knowledge.mjs';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Smallest first (checked against Groq's /models list for this account). Set GROQ_MODEL in Netlify to
// override the first choice; the rest are fallbacks, used only if a model is retired or has hit its own limit.
const MODELS = [process.env.GROQ_MODEL, 'openai/gpt-oss-20b', 'openai/gpt-oss-120b'].filter(Boolean);

// Models Groq said do not exist. Remembered while this function instance is warm, so a retired
// model costs at most one wasted call, not one per message.
const deadModels = new Set();

const MAX_MESSAGE_CHARS = 300;
const MAX_HISTORY = 6;
const MAX_REPLY_CHARS = 1200;
const DAILY_RETRY_AFTER_SECONDS = 180; // a retry-after longer than this means the daily cap, not the per-minute cap

// Best-effort per-visitor limits (kept in memory, so they reset when the function instance restarts).
const PER_MINUTE = 8;
const PER_DAY = 60;
const hits = new Map(); // ip -> number[] of timestamps (ms)

function allowed(ip) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 86_400_000);
  const lastMinute = list.filter((t) => now - t < 60_000).length;
  if (lastMinute >= PER_MINUTE || list.length >= PER_DAY) {
    hits.set(ip, list);
    return false;
  }
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) for (const key of hits.keys()) { hits.delete(key); if (hits.size < 2500) break; } // keep memory bounded
  return true;
}

const json = (status, body, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...headers } });

/** Only accept calls made from this site (or localhost while developing). */
function sameSite(req) {
  const origin = req.headers.get('origin');
  if (!origin) return true; // non-browser caller; still subject to every other limit
  try {
    const o = new URL(origin);
    const host = new URL(req.url).host;
    return o.host === host || o.hostname === 'localhost' || o.hostname === '127.0.0.1';
  } catch {
    return false;
  }
}

function cleanMessages(input) {
  if (!Array.isArray(input)) return null;
  const msgs = input
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_MESSAGE_CHARS) }))
    .filter((m) => m.content)
    .slice(-MAX_HISTORY);
  if (!msgs.length || msgs[msgs.length - 1].role !== 'user') return null;
  return msgs;
}

/** Splits "text [[go:projects]]" into the text and a validated section id. */
export function parseReply(raw) {
  // Accept [[go:projects]] and, if the model forgets the prefix, [[projects]].
  const match = /\[\[(?:go:)?\s*([a-z-]+)\s*\]\]/i.exec(raw);
  const go = match && SECTION_IDS.includes(match[1].toLowerCase()) ? match[1].toLowerCase() : null;
  const reply = raw.replace(/\[\[[^\]]*\]\]/g, '').trim().slice(0, MAX_REPLY_CHARS);
  return { reply, go };
}

export default async (req, context) => {
  if (req.method !== 'POST') return json(405, { error: 'method' }, { allow: 'POST' });
  if (!sameSite(req)) return json(403, { error: 'origin' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return json(503, { error: 'not_configured' });

  const ip = context?.ip || req.headers.get('x-nf-client-connection-ip') || req.headers.get('x-forwarded-for') || 'unknown';
  if (!allowed(ip)) return json(429, { error: 'rate' }, { 'retry-after': '60' });

  let body;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: 'bad_json' });
  }
  const messages = cleanMessages(body?.messages);
  if (!messages) return json(400, { error: 'bad_messages' });

  let sawDailyLimit = false;
  let sawBusy = false;

  for (const model of MODELS) {
    if (deadModels.has(model)) continue;
    let res;
    try {
      res = await fetch(GROQ_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
          max_tokens: 450,
          temperature: 0.3,
          // gpt-oss models "think" before answering; keep that short to save tokens and time.
          ...(model.startsWith('openai/gpt-oss') ? { reasoning_effort: 'low' } : {}),
        }),
        signal: AbortSignal.timeout(10_000),
      });
    } catch {
      return json(504, { error: 'timeout' });
    }

    if (res.ok) {
      const data = await res.json().catch(() => null);
      const text = data?.choices?.[0]?.message?.content;
      if (typeof text !== 'string' || !text.trim()) return json(502, { error: 'empty' });
      return json(200, parseReply(text));
    }

    if (res.status === 429) {
      // Per-minute limits come back with a short retry-after; the daily cap with a long one.
      const retryAfter = Number(res.headers.get('retry-after')) || 0;
      if (retryAfter > DAILY_RETRY_AFTER_SECONDS) sawDailyLimit = true;
      else sawBusy = true;
      continue; // another model has its own allowance, so try it
    }

    // A retired or unknown model: try the next one. Any other error: give up quietly.
    if (res.status === 404 || res.status === 400) {
      if (res.status === 404) deadModels.add(model);
      continue;
    }
    return json(502, { error: 'upstream' });
  }

  if (sawDailyLimit && !sawBusy) return json(429, { error: 'limit' });
  if (sawBusy || sawDailyLimit) return json(429, { error: 'rate' }, { 'retry-after': '30' });
  return json(502, { error: 'no_model' });
};

export const config = { path: '/api/chat' };
