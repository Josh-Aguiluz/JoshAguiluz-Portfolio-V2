import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const THEME_COLORS = { dark: '#09090b', light: '#fafafa' } as const;

/** The initial theme is applied by the inline script in index.html before first paint. */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  // Pre-rendered HTML assumes dark; sync to the real theme after hydration.
  const [isDark, setIsDark] = useState(true);
  useEffect(() => setIsDark(document.documentElement.classList.contains('dark')), []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    const theme = next ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', next);
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', THEME_COLORS[theme]));
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable (private mode): the choice lasts for this page view */
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Dark mode"
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`icon-btn ${className}`}
    >
      {isDark ? <Sun className="h-[18px] w-[18px]" aria-hidden="true" /> : <Moon className="h-[18px] w-[18px]" aria-hidden="true" />}
    </button>
  );
}
