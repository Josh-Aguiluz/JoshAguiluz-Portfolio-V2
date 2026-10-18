import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

interface ScrollVelocityTextProps {
  text: string;
  baseVelocity?: number;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  fontSize?: string; // e.g. "text-[40px] md:text-[60px]"
  padding?: string;  // e.g. "py-8"
}

export default function ScrollVelocityText({
  text,
  baseVelocity = 1,
  textColor = "text-[#A47A2D] dark:text-[#521D07]",
  bgColor = "bg-[#521D07] dark:bg-[#A47A2D]",
  borderColor = "border-[#A47A2D] dark:border-[#521D07]",
  fontSize = "text-[80px] md:text-[120px]",
  padding = "py-12"
}: ScrollVelocityTextProps) {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [x, setX] = useState(0);

  useEffect(() => {
    let animationFrame: number;

    const updatePosition = () => {
      // Add a constant minimum speed (0.1) so it auto-plays even when stationary
      const velocity = (Math.abs(velocityFactor.get()) + 0.1) * baseVelocity * 0.1;
      baseX.current = baseX.current - velocity;

      // Since we repeat 4 times, each item is 25% of the total width. 
      // Wrapping at -25% creates a seamless loop.
      if (baseX.current <= -25) {
        baseX.current = 0;
      } else if (baseX.current > 0) {
        baseX.current = -25;
      }

      setX(baseX.current);
      animationFrame = requestAnimationFrame(updatePosition);
    };

    animationFrame = requestAnimationFrame(updatePosition);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [baseVelocity, velocityFactor]);

  return (
    <div className={`w-full max-w-full overflow-hidden contain-paint ${bgColor} ${padding} border-y-4 ${borderColor}`}>
      <motion.div
        className="flex whitespace-nowrap"
        style={{ x: `${x}%` }}
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            style={{ fontFamily: 'Michroma, sans-serif' }}
            className={`font-black uppercase px-8 ${fontSize} ${textColor}`}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
