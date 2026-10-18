import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="pill-button flex items-center hover:scale-110 transition-transform shadow-2xl"
      style={{
        position: 'fixed',
        zIndex: 9999,
        bottom: '1rem',
        right: '1rem',
        padding: '0.75rem 1rem',
        backgroundColor: isDark ? '#7A8A9D' : '#5A6B7A',
        color: isDark ? '#1A1F2E' : '#FFFCF9',
        gap: '8px',
        border: 'none',
        borderRadius: '9999px',
        cursor: 'pointer'
      }}
      aria-label="Toggle theme"
    >
      <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full flex-shrink-0" style={{ backgroundColor: isDark ? '#4A5568' : '#E8C547' }}></div>
      <span className="font-black uppercase text-xs sm:text-[18px]">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}