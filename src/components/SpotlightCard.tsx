import React from 'react';

type SpotlightCardProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

/**
 * Card with a cursor-following glow. The pointer position is written to the
 * --x / --y custom properties directly, so hovering never re-renders React.
 * The glow itself is the `.spotlight::before` rule in styles/index.css.
 */
export default function SpotlightCard<T extends React.ElementType = 'div'>({
  as,
  className = '',
  children,
  ...rest
}: SpotlightCardProps<T>) {
  const Comp = (as ?? 'div') as React.ElementType;
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  return (
    <Comp className={`spotlight surface ${className}`} onPointerMove={onPointerMove} {...rest}>
      {children}
    </Comp>
  );
}
