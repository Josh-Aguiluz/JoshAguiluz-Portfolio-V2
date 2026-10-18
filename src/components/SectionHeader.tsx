import React from 'react';
import Reveal from './Reveal';

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: 'left' | 'center';
  /** Extra content beside the heading block (e.g. a download button). */
  aside?: React.ReactNode;
  level?: 'h2' | 'h3';
}

/** eyebrow → heading → one-line lede. `id` is what the parent section's aria-labelledby points to. */
export default function SectionHeader({ id, eyebrow, title, lede, align = 'left', aside, level = 'h2' }: SectionHeaderProps) {
  const Heading = level;
  const centered = align === 'center';
  return (
    <Reveal className={`mb-12 md:mb-16 flex flex-col gap-6 ${aside ? 'md:flex-row md:items-end md:justify-between' : ''} ${centered ? 'items-center text-center' : ''}`}>
      <div className={centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
        <p className="eyebrow mb-4">{eyebrow}</p>
        <Heading id={id} className={level === 'h2' ? 'text-h2 font-semibold' : 'text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-tight tracking-[-0.03em] font-semibold'}>
          {title}
        </Heading>
        {lede && <p className="mt-4 text-lede text-fg-muted">{lede}</p>}
      </div>
      {aside}
    </Reveal>
  );
}
