import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS, type Project } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';

export default function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="container-page section-y">
      <SectionHeader
        id="projects-title"
        eyebrow="// Projects"
        title="My Work"
        lede="A collection of projects showcasing my backend development skills, full-stack capabilities, and problem-solving approach."
      />

      <ul className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <Reveal as="li" key={project.title} delay={Math.min(i * 0.05, 0.2)} className={i === 0 ? 'lg:col-span-2' : ''}>
            <ProjectCard project={project} wide={i === 0} onReadMore={setSelected} />
          </Reveal>
        ))}
      </ul>

      {/* Want to see more? */}
      <Reveal className="surface mt-12 flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="max-w-xl">
          <h3 className="text-h3 font-semibold">Want To See More?</h3>
          <p className="mt-2 text-fg-muted">
            Check out my GitHub profile for additional projects, contributions,
            and code samples that showcase my development journey.
          </p>
        </div>
        <a href="https://github.com/Josh-Aguiluz" target="_blank" rel="noopener noreferrer" className="btn btn-secondary shrink-0">
          <Github className="h-4 w-4" aria-hidden="true" />
          Visit GitHub Profile
        </a>
      </Reveal>

      {/* Full write-up */}
      <Modal open={!!selected} onClose={() => setSelected(null)} labelledBy="project-dialog-title" closeLabel="Close project details">
        {selected && (
          <>
            <div className="aspect-[16/9] overflow-hidden border-b border-border bg-surface-2">
              <Picture
                picture={selected.image}
                alt={`Screenshot of ${selected.title}`}
                sizes="(min-width: 672px) 672px, 100vw"
                pictureClassName="block h-full w-full"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="font-mono text-xs text-fg-subtle">{selected.role}</p>
              <h3 id="project-dialog-title" className="mt-1 text-h3 font-semibold">{selected.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                {selected.tags.map((tag) => (
                  <li key={tag} className="badge">{tag}</li>
                ))}
              </ul>
              <div className="mt-6 space-y-4 leading-relaxed text-fg-muted">
                {selected.details.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
                <a href={selected.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Live Site
                </a>
                <a href={selected.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Github className="h-4 w-4" aria-hidden="true" />
                  Source Code
                </a>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
