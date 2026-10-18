import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, Download, ExternalLink, Send } from 'lucide-react';
import { answer, GREETING, QUICK_REPLIES, type BotReply, type SectionTarget } from '../../data/assistant';
import logo from '../../assets/logo.webp?w=96&h=96&fit=cover&format=webp';
import { aiPaused, askAI, type ChatTurn } from '../../lib/askAI';
import { CHAT_AI_ENABLED } from '../../config/layout';

const SECTION_LABELS: Record<SectionTarget, string> = {
  home: 'Home',
  about: 'About',
  'skills-title': 'Skills',
  'certifications-title': 'Certifications',
  projects: 'Projects',
  resume: 'Resume',
  blog: 'Blog',
  contact: 'Contact',
};

const LIMIT_NOTE: BotReply = {
  text: "Sorry! The developer's bank account isn't enough to pay for more AI messages today. Please keep using the free bot for now (I'll answer with it), and try the AI bot again tomorrow.",
};

type Message = { id: number; from: 'bot'; reply: BotReply } | { id: number; from: 'user'; text: string };

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function goTo(target: SectionTarget) {
  const el = document.getElementById(target);
  if (!el) return;
  el.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
}

function BotBubble({ reply, onNavigate }: { reply: BotReply; onNavigate: (t: SectionTarget) => void }) {
  return (
    <div className="max-w-[85%] rounded-xl rounded-tl-sm border border-border bg-surface-2 px-3.5 py-2.5 text-sm leading-relaxed text-fg">
      <p>{reply.text}</p>
      {reply.list && (
        <ul className="mt-2 space-y-1 text-fg-muted">
          {reply.list.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {(reply.links || reply.actions) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {reply.links?.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.download ? { download: link.download } : { target: '_blank', rel: 'noopener noreferrer' })}
              className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-surface px-2.5 py-1.5 text-xs font-medium text-fg transition-colors hover:bg-bg"
            >
              {link.download ? <Download className="h-3.5 w-3.5" aria-hidden="true" /> : <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />}
              {link.label}
            </a>
          ))}
          {reply.actions?.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => onNavigate(action.target)}
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-2.5 py-1.5 text-xs font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              {action.label}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ChatWindow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: 'bot', reply: GREETING }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const nextId = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const alive = useRef(true);

  // Focus the input when opened; Escape closes.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      clearTimeout(timer.current);
    };
  }, []);

  const navigate = (target: SectionTarget) => {
    goTo(target);
    // On small screens the window covers the page, so get out of the way.
    if (window.matchMedia('(max-width: 639px)').matches) onClose();
  };

  const addBot = (reply: BotReply) => setMessages((m) => [...m, { id: nextId.current++, from: 'bot', reply }]);

  /** The free scripted bot: instant, offline, and always available. */
  const scriptedReply = (q: string) => {
    const result = answer(q);
    timer.current = setTimeout(() => {
      setTyping(false);
      addBot(result.reply);
      if (result.navigateTo) navigate(result.navigateTo);
    }, prefersReducedMotion() ? 0 : 450);
  };

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    const history: ChatTurn[] = [
      ...messages.slice(-6).flatMap((msg): ChatTurn[] =>
        msg.from === 'user' ? [{ role: 'user', content: msg.text }] : msg.reply.aiText ? [{ role: 'assistant', content: msg.reply.aiText }] : [],
      ),
      { role: 'user', content: q },
    ];
    setMessages((m) => [...m, { id: nextId.current++, from: 'user', text: q }]);
    setInput('');
    setTyping(true);

    // Explicit navigation requests ("go to contact") are instant and never need the AI.
    const local = answer(q);
    if (!CHAT_AI_ENABLED || aiPaused() || local.navigateTo) return scriptedReply(q);

    const result = await askAI(history);
    if (!alive.current) return;
    if (result.status === 'ok') {
      setTyping(false);
      addBot({
        text: result.text,
        aiText: result.text,
        actions: result.go ? [{ label: `Go to ${SECTION_LABELS[result.go]}`, target: result.go }] : undefined,
      });
    } else if (result.status === 'limit') {
      setTyping(false);
      addBot(LIMIT_NOTE);
      scriptedReply(q);
      setTyping(true);
    } else {
      scriptedReply(q);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="chat-window"
          role="dialog"
          aria-label="Portfolio assistant"
          className="surface fixed inset-x-3 bottom-28 z-50 flex max-h-[min(36rem,calc(100dvh-9rem))] flex-col overflow-hidden !bg-surface sm:inset-x-auto sm:right-4 sm:w-[24rem] md:bottom-32 md:right-6"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'bottom right' }}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center gap-3 border-b border-border bg-surface-2 px-4 py-3">
            <img src={logo} alt="" width={32} height={32} className="h-8 w-8 rounded-full" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-tight">Josh's Assistant</p>
              <p className="flex items-center gap-1.5 font-mono text-[11px] text-fg-subtle">
                <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                Answers about Josh &amp; this site
              </p>
            </div>
          </div>

          {/* Messages */}
          <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite" aria-relevant="additions">
            {messages.map((msg) =>
              msg.from === 'bot' ? (
                <div key={msg.id} className="flex">
                  <BotBubble reply={msg.reply} onNavigate={navigate} />
                </div>
              ) : (
                <div key={msg.id} className="flex justify-end">
                  <p className="max-w-[85%] rounded-xl rounded-tr-sm bg-accent px-3.5 py-2.5 text-sm text-accent-fg">{msg.text}</p>
                </div>
              ),
            )}
            {typing && (
              <div className="flex" aria-label="Assistant is typing">
                <span className="flex gap-1 rounded-xl rounded-tl-sm border border-border bg-surface-2 px-3.5 py-3">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-fg-subtle" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </span>
              </div>
            )}
          </div>

          {/* Quick replies */}
          <div className="flex shrink-0 flex-wrap gap-1.5 border-t border-border px-3 py-2.5" aria-label="Suggested questions">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs text-fg-muted transition-colors hover:border-accent/50 hover:text-fg"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            className="flex shrink-0 items-center gap-2 border-t border-border p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <label htmlFor="chat-input" className="sr-only">Ask about Josh</label>
            <input
              ref={inputRef}
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Josh, or say “go to projects”"
              autoComplete="off"
              maxLength={200}
              className="field !min-h-10 flex-1 !py-2 text-sm"
            />
            <button type="submit" aria-label="Send" disabled={!input.trim() || typing} className="btn btn-primary !h-10 !min-h-10 !w-10 !px-0">
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </m.div>
      )}
    </AnimatePresence>
  );
}
