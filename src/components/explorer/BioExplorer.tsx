import React from 'react';
import { MapPin } from 'lucide-react';
import ExplorerWindow, { MetaTable, type ExplorerItem } from './ExplorerWindow';
import Picture, { type PictureData } from '../Picture';
import holyAngelImg from '../../assets/holyAngel.webp?w=320;640&format=avif;webp&as=picture';
import acsciImg from '../../assets/ACSCI.webp?w=320;640&format=avif;webp&as=picture';

/** Photo inside viewfinder corner brackets. */
function FramedPreview({ picture, alt }: { picture: PictureData; alt: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[18rem] p-3 lg:mx-0">
      {['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map(
        (pos) => <span key={pos} aria-hidden="true" className={`absolute h-6 w-6 border-fg-subtle ${pos}`} />,
      )}
      <div className="overflow-hidden rounded-lg border border-border bg-surface-2">
        <Picture
          picture={picture}
          alt={alt}
          sizes="288px"
          pictureClassName="block aspect-square w-full"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

const STATUS = (
  <span className="inline-flex items-center gap-2 text-success">
    <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
    Available for Work
  </span>
);

export default function BioExplorer({ profileImg }: { profileImg: PictureData }) {
  const items: ExplorerItem[] = [
    {
      id: 'bio',
      label: 'bio.md',
      kind: 'file',
      content: (
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_auto]">
          <div className="min-w-0">
            <h3 className="text-h3 font-semibold text-accent">Josh Andrei Aguiluz</h3>
            <div className="mt-4 max-w-[60ch] space-y-3 leading-relaxed text-fg-muted">
              <p>
                BS Information Technology student at <span className="text-fg">Holy Angel University</span>,
                ranked <span className="text-fg">Top 1%</span> in the Web Development track.
              </p>
              <p>
                I combine strong backend logic with frontend adaptability to build
                <span className="text-fg"> efficient, scalable systems</span> that solve real-world problems.
              </p>
              <p>
                My <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.9em] text-fg">"cheetah-mindset"</span> drives
                rapid learning and continuous improvement in the fast-paced world of software development.
              </p>
            </div>
            <MetaTable
              rows={[
                { label: 'File type:', value: 'Markdown Document' },
                { label: 'Role:', value: 'Backend Engineer' },
                { label: 'Status:', value: STATUS },
              ]}
            />
          </div>
          <FramedPreview picture={profileImg} alt="Josh Andrei Aguiluz - Backend Engineer Profile Photo" />
        </div>
      ),
    },
    {
      id: 'education',
      label: 'education.md',
      kind: 'file',
      content: (
        <div>
          <h3 className="text-h3 font-semibold text-accent">Education</h3>
          <ol className="mt-6 grid gap-4 lg:grid-cols-2">
            {[
              {
                img: holyAngelImg,
                year: '2023 - 2027',
                title: 'BS Information Technology',
                org: 'Holy Angel University',
                desc: 'Major within Web Development Track. Top 1% ranking Academic Scholar.',
              },
              {
                img: acsciImg,
                year: '2017 - 2022',
                title: 'STEM Strand Badge',
                org: 'Angeles City Science High School',
                desc: 'Graduated with High Honors. Specialization in Advanced Mathematics & Research.',
              },
            ].map((e) => (
              <li key={e.title} className="overflow-hidden rounded-lg border border-border">
                <div className="aspect-[16/7] overflow-hidden border-b border-border bg-surface-2">
                  <Picture picture={e.img} alt={`${e.title} - ${e.org}`} sizes="(min-width: 1024px) 400px, 100vw" pictureClassName="block h-full w-full" className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="font-mono text-xs text-accent">{e.year}</p>
                  <h4 className="mt-1 font-semibold tracking-tight">{e.title}</h4>
                  <p className="text-sm text-fg-muted">{e.org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{e.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
    {
      id: 'location',
      label: 'location.md',
      kind: 'file',
      content: (
        <div>
          <h3 className="text-h3 font-semibold text-accent">Location</h3>
          <p className="mt-4 max-w-[60ch] leading-relaxed text-fg-muted">
            I'm actively seeking internship opportunities where I can contribute to
            impactful projects and grow as a developer.
          </p>
          <MetaTable
            rows={[
              {
                label: 'Based in:',
                value: (
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Magalang%2C+Pampanga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 underline decoration-border-strong underline-offset-4 hover:decoration-accent"
                  >
                    <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                    Magalang, Pampanga
                  </a>
                ),
              },
              { label: 'Seeking:', value: 'Backend Developer internship' },
              { label: 'Status:', value: STATUS },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <ExplorerWindow
      title="ABOUT_ME.EXE"
      path="C:/portfolio/about_me/{label}"
      items={items}
      label="About me files"
    />
  );
}
