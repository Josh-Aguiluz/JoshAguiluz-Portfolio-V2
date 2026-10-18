import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if device is mobile/tablet
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Don't render custom cursor on mobile/tablet
  if (isMobile) return null;

  return (
    <>
      {/* Custom Cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none transition-all duration-150 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          zIndex: 999999,
        }}
      >
        {/* Main cursor dot */}
        <div
          className={`pointer-events-none transition-all duration-300 ease-out ${isHovering
            ? 'w-12 h-12 -translate-x-6 -translate-y-6 border-4 border-[#A47A2D] bg-transparent'
            : 'w-4 h-4 -translate-x-2 -translate-y-2 bg-[#521D07]'
            } rounded-full`}
        />
      </div>
    </>
  );
}