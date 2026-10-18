import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[6px] bg-gradient-to-r from-[#FFA51F] via-[#A47A2D] to-[#521D07] z-[999] shadow-lg transition-all"
      style={{ 
        width: `${scrollProgress}%`,
        transitionDuration: '100ms',
        transitionTimingFunction: 'linear'
      }}
    />
  );
}