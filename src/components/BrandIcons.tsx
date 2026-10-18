import React from 'react';
import {
  siAngular, siCss3, siExpress, siFigma, siFirebase, siFlutter, siGit, siHtml5,
  siNodedotjs, siPhp, siPostman, siReact, siTailwindcss,
} from 'simple-icons';
import {
  Brain, Code2, Database, Lightbulb, MessagesSquare, Rocket, Shuffle, Users,
  type LucideIcon,
} from 'lucide-react';
import type { BrandIcon } from '../data/skills';

type SimpleIcon = { path: string; hex: string };

/**
 * Brand marks from simple-icons (CC0). Brand color lives on the icon only.
 * `null` color = follow the text color (logos that are black would vanish in dark mode).
 */
const BRANDS: Partial<Record<BrandIcon, { icon: SimpleIcon; color: string | null }>> = {
  node: { icon: siNodedotjs, color: '#5FA04E' },
  express: { icon: siExpress, color: null },
  php: { icon: siPhp, color: '#777BB4' },
  firebase: { icon: siFirebase, color: '#FFCA28' },
  react: { icon: siReact, color: '#61DAFB' },
  angular: { icon: siAngular, color: '#DD0031' },
  html: { icon: siHtml5, color: '#E34F26' },
  css: { icon: siCss3, color: '#1572B6' },
  tailwind: { icon: siTailwindcss, color: '#06B6D4' },
  flutter: { icon: siFlutter, color: '#47C5FB' },
  git: { icon: siGit, color: '#F05032' },
  postman: { icon: siPostman, color: '#FF6C37' },
  figma: { icon: siFigma, color: '#F24E1E' },
};

/** Non-brand marks (no official icon available, or soft skills). */
const GLYPHS: Partial<Record<BrandIcon, LucideIcon>> = {
  vscode: Code2,
  adaptability: Shuffle,
  'problem-solving': Lightbulb,
  teamwork: Users,
  'fast-learning': Rocket,
  communication: MessagesSquare,
  'critical-thinking': Brain,
};

export default function BrandIconSvg({ icon, className = 'h-5 w-5' }: { icon: BrandIcon; className?: string }) {
  const brand = BRANDS[icon];
  if (icon === 'mysql') {
    // The MySQL brand mark is a wordmark that is illegible at icon sizes.
    return <Database className={className} color="#4479A1" strokeWidth={1.75} aria-hidden="true" />;
  }
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill={brand.color ?? 'currentColor'}
        aria-hidden="true"
      >
        <path d={brand.icon.path} />
      </svg>
    );
  }
  const Glyph = GLYPHS[icon];
  return Glyph ? <Glyph className={`${className} text-fg-muted`} strokeWidth={1.75} aria-hidden="true" /> : null;
}
