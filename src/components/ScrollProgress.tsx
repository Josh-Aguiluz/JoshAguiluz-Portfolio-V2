import React from 'react';
import { m, useScroll } from 'framer-motion';

/** Page progress bar driven by a motion value (transform only, no React state). */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-accent"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
