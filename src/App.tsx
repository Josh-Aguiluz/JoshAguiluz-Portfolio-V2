import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from './assets/logo.webp?w=96&h=96&fit=cover&format=webp';
import HomePage from './pages/HomePage';
import ThemeToggle from './components/ThemeToggle';
import ScrollProgress from './components/ScrollProgress';
import Footer from './components/Footer';
import { useDialogFocus } from './lib/useDialogFocus';
import ChatLauncher from './components/chat/ChatLauncher';
import { CHAT_ENABLED } from './config/layout';

// Every section renders up front (and is pre-rendered into the HTML at build time), so the
// page has its full height on the first frame and the scroll position can be restored before
// anything is painted. Images inside the sections still load lazily.
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ResumePage from './pages/ResumePage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Resume', id: 'resume' },
  { name: 'Blog', id: 'blog' },
  { name: 'Contact', id: 'contact' },
];

const BASE_TITLE = 'Josh Andrei Aguiluz | Backend Engineer';

const SECTIONS: { id: string; Page: () => React.JSX.Element }[] = [
  { id: 'about', Page: AboutPage },
  { id: 'projects', Page: ProjectsPage },
  { id: 'resume', Page: ResumePage },
  { id: 'blog', Page: BlogPage },
  { id: 'contact', Page: ContactPage },
];

// useLayoutEffect warns during the build-time server render; it is a no-op there anyway.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const SCROLL_KEY = 'scroll-y';

/**
 * Reload / back-forward / duplicated tab: return to the saved pixel position.
 * Fresh visit with a hash (shared link): go to that section. Otherwise: nothing.
 */
function getRestoreTarget(): { y?: number; id?: string } | null {
  const nav = performance.getEntriesByType?.('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (nav && nav.type !== 'navigate') {
    try {
      const saved = sessionStorage.getItem(SCROLL_KEY);
      if (saved !== null && !Number.isNaN(Number(saved))) return { y: Number(saved) };
    } catch {
      /* storage unavailable */
    }
  }
  const id = window.location.hash.slice(1);
  return id ? { id } : null;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  // Becomes true once the initial scroll position has been restored.
  const hashHandled = useRef(false);

  const headerRef = useRef<HTMLElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  // `scrolled` only re-renders when the boolean actually flips.
  // The scroll position is saved per tab so a reload or duplicated tab reopens at the same spot.
  useEffect(() => {
    let saveTimer: ReturnType<typeof setTimeout> | undefined;
    const save = () => {
      if (!hashHandled.current) return; // don't overwrite the saved spot before it is restored
      try {
        sessionStorage.setItem(SCROLL_KEY, String(Math.round(window.scrollY)));
      } catch {
        /* storage unavailable */
      }
    };
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      clearTimeout(saveTimer);
      saveTimer = setTimeout(save, 150);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pagehide', save);
    return () => {
      clearTimeout(saveTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', save);
    };
  }, []);

  // Active section via IntersectionObserver: a thin band across the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Restore where the visitor was (reload / duplicated tab / Chrome tab discard) or honor a
  // deep link (e.g. /#contact). Runs before the first paint, so nothing visibly jumps.
  useIsoLayoutEffect(() => {
    const target = getRestoreTarget();
    if (target?.y != null) {
      window.scrollTo({ top: target.y, behavior: 'instant' });
    } else if (target?.id) {
      document.getElementById(target.id)?.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    hashHandled.current = true;
  }, []);

  // Sync the active section to the URL hash and the document title.
  useEffect(() => {
    if (!hashHandled.current) return;
    const url = activeSection === 'home' ? window.location.pathname : `#${activeSection}`;
    window.history.replaceState(window.history.state, '', url);
    const name = activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
    document.title = activeSection === 'home' ? BASE_TITLE : `${name} | ${BASE_TITLE}`;
  }, [activeSection]);

  // Mobile menu: focus trap + Escape, body scroll lock, close when resized to desktop.
  useDialogFocus(mobileMenuOpen, headerRef, { initialFocusRef: firstMobileLinkRef, onEscape: closeMenu });
  useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = 'hidden';
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => mq.matches && closeMenu();
    mq.addEventListener('change', onChange);
    return () => {
      document.body.style.overflow = '';
      mq.removeEventListener('change', onChange);
    };
  }, [mobileMenuOpen, closeMenu]);

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-3 z-[70] rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
      >
        Skip to content
      </a>

      <ScrollProgress />

      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
          scrolled || mobileMenuOpen ? 'border-border bg-bg/95' : 'border-transparent bg-transparent'
        }`}
      >
        <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2.5 rounded-md" onClick={closeMenu}>
            <img src={logo} alt="" width={32} height={32} className="h-8 w-8 rounded-full" />
            <span className="text-[0.9375rem] font-semibold tracking-tight">Josh Aguiluz</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={active ? 'location' : undefined}
                    className={`relative inline-flex h-9 items-center rounded-md px-3 text-sm transition-colors ${
                      active ? 'text-fg' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {link.name}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-[13px] h-px bg-accent transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="icon-btn md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <m.div
              id="mobile-menu"
              className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-border bg-bg md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <ul className="container-page flex flex-col py-6">
                {NAV_LINKS.map((link, i) => {
                  const active = activeSection === link.id;
                  return (
                    <li key={link.id} className="border-b border-border">
                      <a
                        ref={i === 0 ? firstMobileLinkRef : undefined}
                        href={`#${link.id}`}
                        onClick={closeMenu}
                        aria-current={active ? 'location' : undefined}
                        className={`flex items-center justify-between py-4 text-2xl font-semibold tracking-tight ${active ? 'text-fg' : 'text-fg-muted'}`}
                      >
                        {link.name}
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main" tabIndex={-1} className="outline-none">
        <section id="home" aria-label="Introduction">
          <HomePage />
        </section>

        {SECTIONS.map(({ id, Page }) => (
          <section key={id} id={id} aria-labelledby={`${id}-title`} className="border-t border-border">
            <Page />
          </section>
        ))}
      </main>

      <Footer showBackToTop={scrolled} />

      {CHAT_ENABLED && <ChatLauncher />}
    </>
  );
}
