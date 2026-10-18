import React from 'react';

interface InfiniteMarqueeProps {
  items: string[];
}

/** Muted mono ticker. Pure CSS transform animation; stops under prefers-reduced-motion. */
export default function InfiniteMarquee({ items }: InfiniteMarqueeProps) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span className="text-border-strong" aria-hidden="true">/</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-border bg-surface/40 py-4 font-mono text-sm text-fg-subtle [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee-track flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
