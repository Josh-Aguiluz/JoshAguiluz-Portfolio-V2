import React from 'react';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import TypewriterTerminal from '../components/TypewriterTerminal';
import InfiniteMarquee from '../components/InfiniteMarquee';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import { PROJECTS } from '../data/projects';
import resumePdf from '../assets/resume.pdf';

const STATS = [
  { value: '5', label: 'Projects' },
  { value: '6+', label: 'Certifications' },
  { value: 'Top 1%', label: 'Class Rank' },
];

/** CSS entrance: runs straight from the pre-rendered HTML, before any JS loads. */
const enter = (delay: number) => ({
  style: { animationDelay: `${delay}s` } as React.CSSProperties,
});

export default function HomePage() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <>
      {/* ===== Hero ===== */}
      <div className="glow-top relative">
        <div className="container-page grid items-center gap-12 pb-20 pt-32 md:pb-28 md:pt-40 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <p className="animate-enter inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-fg-muted" style={enter(0).style}>
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" aria-hidden="true" />
              Available for Work
            </p>

            {/* The h1 is the LCP element: it renders immediately with the preloaded font. */}
            <h1 className="mt-6 text-display font-semibold">
              <span className="block text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] font-medium tracking-[-0.02em] text-fg-muted">
                Josh Andrei Aguiluz
              </span>
              <span className="mt-2 block">
                Backend <span className="text-accent">Engineer</span>
              </span>
            </h1>

            <p className="animate-enter mt-6 max-w-[34rem] text-lede text-fg-muted" style={enter(0.1).style}>
              Building <span className="text-fg">efficient</span>, <span className="text-fg">scalable systems</span> that
              solve real-world problems.
            </p>

            <div className="animate-enter mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={enter(0.15).style}>
              <a href="#projects" className="btn btn-primary">
                View Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Me
              </a>
              <a href={resumePdf} download="Josh_Aguiluz_Resume.pdf" className="btn btn-ghost">
                <Download className="h-4 w-4" aria-hidden="true" />
                Resume
              </a>
            </div>
          </div>

          {/* Terminal + quick stats */}
          <div className="animate-enter surface overflow-hidden" style={enter(0.2).style}>
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" aria-hidden="true" />
              <span className="ml-2 font-mono text-xs text-fg-subtle">terminal</span>
            </div>
            <div className="px-5 py-6">
              <TypewriterTerminal />
            </div>
            <dl className="grid grid-cols-3 border-t border-border">
              {STATS.map((stat, i) => (
                <div key={stat.label} className={`px-4 py-5 sm:px-5 ${i > 0 ? 'border-l border-border' : ''}`}>
                  <dt className="font-mono text-[11px] text-fg-subtle sm:text-xs">{stat.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <InfiniteMarquee items={['Scalable Systems', 'Robust APIs', 'Clean Code', 'Performance Optimization']} />

      {/* ===== Selected Work teaser (same data as #projects) ===== */}
      <div className="container-page py-20 md:py-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">{'// Selected Work'}</p>
            <h2 className="text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em]">Featured Projects</h2>
          </div>
          <a href="#projects" className="btn btn-ghost hidden shrink-0 sm:inline-flex">
            View All Projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <ul className="grid gap-3 md:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal as="li" key={project.title} delay={i * 0.05}>
              <a href="#projects" className="surface group flex h-full flex-col overflow-hidden transition-colors hover:border-border-strong">
                <div className="aspect-[16/10] overflow-hidden border-b border-border bg-surface-2">
                  <Picture
                    picture={project.image}
                    alt={`Screenshot of ${project.title}`}
                    sizes="(min-width: 768px) 360px, 100vw"
                    pictureClassName="block h-full w-full"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 items-start justify-between gap-3 p-4">
                  <div>
                    <h3 className="font-semibold tracking-tight">{project.title}</h3>
                    <p className="mt-1 font-mono text-xs text-fg-subtle">{project.role}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-subtle transition-colors group-hover:text-fg" aria-hidden="true" />
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        <a href="#projects" className="btn btn-secondary mt-6 w-full sm:hidden">
          View All Projects
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
