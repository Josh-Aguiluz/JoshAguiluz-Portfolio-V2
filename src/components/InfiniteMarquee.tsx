import React from 'react';
import { motion } from 'framer-motion';

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  speed?: number;
}

export default function InfiniteMarquee({ children, speed = 50 }: InfiniteMarqueeProps) {
  return (
    <div className="relative overflow-hidden w-full">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: [0, -1920], // Moves left
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
        whileHover={{
          animationPlayState: 'paused',
        }}
      >
        {/* Render children twice for seamless loop */}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
