import React, { useId, useRef, useState } from 'react';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import type { Project } from '../data/projects';
import Picture from './Picture';
import SpotlightCard from './SpotlightCard';

type Tab = 'overview' | 'technical';
const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'technical', label: 'Technical View' },
];

interface ProjectCardProps {
  project: Project;
  /** Full-width horizontal layout on large screens. */
  wide?: boolean;
  onReadMore: (project: Project) => void;
}

export default function ProjectCard({ project, wide = false, onReadMore }: ProjectCardProps) {
  const [tab, setTab] = useState<Tab>('overview');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const titleId = `${uid}-title`;

  const onTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') nextIndex = (index + 1) % TABS.length;
    if (e.key === 'ArrowLeft') nextIndex = (index - 1 + TABS.length) % TABS.length;
    if (e.key === 'Home') nextIndex = 0;
    if (e.key === 'End') nextIndex = TABS.length - 1;
    if (nextIndex === null) return;
    e.preventDefault();
    setTab(TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <SpotlightCard
      as="article"
      aria-labelledby={titleId}
      className="group flex h-full flex-col overflow-hidden"
    >
      {/* Thumbnail (16:10, or cinematic on the full-width card; transform-only zoom) */}
      <div className={`relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-2 ${wide ? 'lg:aspect-[21/9]' : ''}`}>
        <Picture
          picture={project.image}
          alt={`Screenshot of ${project.title}`}
          sizes={wide ? '(min-width: 1152px) 1088px, 100vw' : '(min-width: 1024px) 540px, 100vw'}
          pictureClassName="block h-full w-full"
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 id={titleId} className="text-h3 font-semibold">{project.title}</h3>
            <p className="mt-1 font-mono text-xs text-fg-subtle">{project.role}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
              className="icon-btn"
            >
              <Github className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the live ${project.title} site`}
              className="icon-btn"
            >
              <ExternalLink className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Segmented control */}
        <div role="tablist" aria-label={`${project.title} details`} className="mb-4 inline-flex w-full rounded-lg border border-border bg-surface-2 p-1 sm:w-auto sm:self-start">
          {TABS.map((t, i) => {
            const selected = tab === t.id;
            return (
              <button
                key={t.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                id={`${uid}-tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${uid}-panel-${t.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors sm:flex-none ${
                  selected ? 'bg-surface text-fg shadow-[0_0_0_1px_var(--color-border-strong)]' : 'text-fg-muted hover:text-fg'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Fixed-height panel region: switching tabs never changes the card height (no CLS). */}
        <div className="relative h-[17.5rem] sm:h-[16rem]">
          <div
            id={`${uid}-panel-overview`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-overview`}
            hidden={tab !== 'overview'}
            tabIndex={0}
            className="absolute inset-0 flex flex-col overflow-y-auto rounded-md"
          >
            <p className="text-[0.9375rem] leading-relaxed text-fg-muted">{project.description}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li key={tag} className="badge">{tag}</li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onReadMore(project)}
              className="btn btn-ghost mt-auto -ml-3 self-start !px-3"
            >
              Read the full write-up
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div
            id={`${uid}-panel-technical`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-technical`}
            hidden={tab !== 'technical'}
            tabIndex={0}
            className="absolute inset-0 space-y-4 overflow-y-auto rounded-md pr-1 text-sm"
          >
            <div>
              <h4 className="mb-1 font-mono text-xs font-normal text-fg-subtle">Problem</h4>
              <p className="leading-relaxed text-fg-muted">{project.problem}</p>
            </div>
            <div>
              <h4 className="mb-2 font-mono text-xs font-normal text-fg-subtle">Architecture</h4>
              <ol className="flex flex-wrap items-center gap-1.5" aria-label="Request flow">
                {project.architecture.map((layer, i) => (
                  <li key={layer} className="flex items-center gap-1.5">
                    {i > 0 && <span aria-hidden="true" className="font-mono text-fg-subtle">→</span>}
                    <span className="badge !text-fg">{layer}</span>
                  </li>
                ))}
              </ol>
              {project.deployment && <p className="mt-2 font-mono text-xs text-fg-subtle">{project.deployment}</p>}
            </div>
            <div>
              <h4 className="mb-1 font-mono text-xs font-normal text-fg-subtle">Highlights</h4>
              <ul className="space-y-1.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2 leading-relaxed text-fg-muted">
                    <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
