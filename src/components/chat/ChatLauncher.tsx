import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

// The chat window (and its knowledge base) loads only the first time it is opened.
const ChatWindow = lazy(() => import('./ChatWindow'));

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // "Unread" state: a dot on the button, plus a greeting bubble that waves hello.
  const [unread, setUnread] = useState(false);
  const [bubble, setBubble] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  const dismissBubble = useCallback(() => {
    setBubble(false);
  }, []);

  const openChat = useCallback(() => {
    setLoaded(true);
    setOpen(true);
    setUnread(false);
    setBubble(false);
  }, []);

  // Greet on every page load, and again whenever the chat is closed, until it is opened (or the X is clicked).
  useEffect(() => {
    if (open) return;
    setUnread(true);
    setBubble(true);
  }, [open]);

  // Escape dismisses the greeting.
  useEffect(() => {
    if (!bubble) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismissBubble();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [bubble, dismissBubble]);

  return (
    <>
      {/* Greeting bubble */}
      <AnimatePresence>
        {bubble && !open && (
          <m.div
            role="status"
            className="fixed bottom-4 right-[7rem] z-50 w-[min(20rem,calc(100vw-8.5rem))] md:bottom-6 md:right-[8.5rem]"
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            style={{ transformOrigin: 'bottom right' }}
          >
            <div className="surface relative !bg-surface shadow-[0_12px_32px_-12px_rgb(0_0_0/0.55)]">
              <button
                type="button"
                onClick={openChat}
                className="flex w-full items-start gap-3 rounded-[inherit] p-5 pr-10 text-left transition-colors hover:bg-surface-2"
              >
                <span aria-hidden="true" className="wave-hand mt-0.5 text-3xl leading-none">👋</span>
                <span>
                  <span className="block text-base font-semibold leading-snug">Hi! I'm Josh's assistant</span>
                  <span className="mt-1 block text-sm leading-snug text-fg-muted">
                    Ask me about his projects, skills, or how to reach him.
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Start chatting
                    <span aria-hidden="true">→</span>
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={dismissBubble}
                aria-label="Dismiss greeting"
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-md text-fg-subtle transition-colors hover:bg-surface-2 hover:text-fg"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
              {/* Tail pointing at the chat button */}
              <span
                aria-hidden="true"
                className="absolute -right-[7px] bottom-8 h-3.5 w-3.5 rotate-45 border-r border-t border-border bg-surface md:bottom-10"
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          if (open) {
            close();
          } else {
            openChat();
          }
        }}
        // Preload on hover/focus so it opens instantly.
        onPointerEnter={() => import('./ChatWindow')}
        onFocus={() => import('./ChatWindow')}
        aria-expanded={open}
        aria-controls="chat-window"
        aria-label={open ? 'Close chat assistant' : unread ? 'Open chat assistant (1 new message)' : 'Open chat assistant'}
        className="fixed bottom-4 right-4 z-50 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-fg shadow-[0_8px_24px_-8px_rgb(0_0_0/0.5)] transition-transform hover:scale-105 md:bottom-6 md:right-6 md:h-24 md:w-24"
      >
        {unread && !open && <span aria-hidden="true" className="chat-pulse" />}
        {open ? <X className="h-9 w-9" aria-hidden="true" /> : <MessageCircle className="h-10 w-10 md:h-12 md:w-12" aria-hidden="true" />}
        {unread && !open && (
          <span
            aria-hidden="true"
            className="absolute right-1 top-1 h-6 w-6 rounded-full border-2 border-bg bg-danger"
          />
        )}
      </button>

      {loaded && (
        <Suspense fallback={null}>
          <ChatWindow open={open} onClose={close} />
        </Suspense>
      )}
    </>
  );
}
