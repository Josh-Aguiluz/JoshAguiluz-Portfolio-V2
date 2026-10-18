import React from 'react';
import { m } from 'framer-motion';
import { Award, Cpu, Download, Layers, TrendingUp } from 'lucide-react';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { SKILL_BREAKDOWN } from '../data/skills';
import acsciWebp from '../assets/ACSCI.webp?w=320;640&format=avif;webp&as=picture';
import holyAngelWebp from '../assets/holyAngel.webp?w=320;640&format=avif;webp&as=picture';
import javascriptWebp from '../assets/javascript.webp?w=320;640&format=avif;webp&as=picture';
import phpResumeWebp from '../assets/phpResume.webp?w=320;640&format=avif;webp&as=picture';
import ccnaResumeWebp from '../assets/ccnaReallll.webp?w=276&format=avif;webp&as=picture';
import comptiaResumeWebp from '../assets/comptiaResume.webp?w=301&format=avif;webp&as=picture';
import hubspotResumeWebp from '../assets/hubspotResume.webp?w=320;640&format=avif;webp&as=picture';
import resumePdf from '../assets/resume.pdf';

const SERIES_COLORS = ['var(--color-chart-1)', 'var(--color-chart-2)', 'var(--color-chart-3)'];

/* ================================================================
   Skills ring chart. Colors come from CSS tokens, so it follows the
   theme with no JS theme detection. Animates opacity only.
   ================================================================ */
function SkillsRingChart() {
  const size = 240;
  const stroke = 36;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const gap = 4; // visual separation between segments

  let accumulated = 0;
  const segments = SKILL_BREAKDOWN.map((seg, i) => {
    const length = (seg.pct / 100) * circumference;
    const data = { ...seg, color: SERIES_COLORS[i], dash: Math.max(length - gap, 0), offset: -accumulated };
    accumulated += length;
    return data;
  });

  return (
    <div className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14">
      <m.div
        className="relative mx-auto w-full max-w-[240px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6 }}
      >
        <svg viewBox={`0 0 ${size} ${size}`} className="block h-auto w-full -rotate-90" role="img" aria-label="Skills breakdown: Backend 50%, DevTools 30%, Frontend 20%">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-surface-2)" strokeWidth={stroke} />
          {segments.map((seg) => (
            <circle
              key={seg.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
              strokeDashoffset={seg.offset}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold tracking-tight">100%</span>
          <span className="font-mono text-xs text-fg-subtle">Skills</span>
        </div>
      </m.div>

      <ul className="grid gap-6">
        {segments.map((seg) => (
          <li key={seg.label}>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: seg.color }} aria-hidden="true" />
              <span className="font-medium">{seg.label}</span>
              <span className="font-mono text-sm text-fg-subtle">{seg.pct}%</span>
            </div>
            <ul className="flex flex-wrap gap-1.5 pl-5" aria-label={`${seg.label} skills`}>
              {seg.items.map((item) => (
                <li key={item} className="badge">{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================================================================
   Main Page
   ================================================================ */
export default function ResumePage() {
  const timeline = [
    {
      year: '2023 - 2027',
      title: 'BS Information Technology',
      org: 'Holy Angel University',
      desc: 'Major within Web Development Track. Top 1% ranking Academic Scholar.',
      image: holyAngelWebp,
    },
    {
      year: '2017 - 2022',
      title: 'STEM Strand Badge',
      org: 'Angeles City Science High School',
      desc: 'Graduated with High Honors. Specialization in Advanced Mathematics & Research.',
      image: acsciWebp,
    },
    {
      year: '2024',
      title: 'JavaScript Essentials 1',
      org: 'Cisco',
      desc: 'Certified in core JavaScript fundamentals including ES6+ syntax and DOM manipulation.',
      image: javascriptWebp,
    },
    {
      year: '2024',
      title: 'CCNA: Intro to Networks',
      org: 'Cisco',
      desc: 'Certified in networking fundamentals, IP addressing, and network protocols.',
      image: ccnaResumeWebp,
    },
    {
      year: '2023',
      title: 'PHP Basics',
      org: 'Simplilearn',
      desc: 'Certified in PHP fundamentals for server-side web development.',
      image: phpResumeWebp,
    },
    {
      year: '2023',
      title: 'CompTIA IT Fundamentals',
      org: 'CompTIA',
      desc: 'Certified in core IT concepts, security, and software development fundamentals.',
      image: comptiaResumeWebp,
    },
    {
      year: '2023',
      title: 'Digital Marketing',
      org: 'HubSpot Academy',
      desc: 'Certified in digital marketing strategies, SEO, and content marketing.',
      image: hubspotResumeWebp,
    },
  ];

  const quickStats = [
    { value: '5+', label: 'Projects', icon: Layers },
    { value: '6+', label: 'Certifications', icon: Award },
    { value: 'Top 1%', label: 'Class Rank', icon: TrendingUp },
    { value: '100%', label: 'Commitment', icon: Cpu },
  ];

  return (
    <div className="container-page section-y">
      <SectionHeader
        id="resume-title"
        eyebrow="// Professional Profile"
        title="Resume"
        aside={
          <a href={resumePdf} download="Josh_Aguiluz_Resume.pdf" className="btn btn-primary self-start md:self-auto">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download PDF
          </a>
        }
      />

      {/* Professional summary */}
      <Reveal className="surface p-6 sm:p-8 md:p-10">
        <h3 className="font-mono text-xs font-normal text-fg-subtle">Professional Summary</h3>
        <p className="mt-4 max-w-[65ch] text-[1.0625rem] leading-relaxed text-fg-muted">
          Motivated <span className="text-fg">BS Information Technology</span> student and{' '}
          <span className="text-fg">Top 1% Scholar</span> seeking a Backend Developer internship.
          I leverage Full-Stack capabilities in{' '}
          <span className="badge !text-fg">Node.js</span>,{' '}
          <span className="badge !text-fg">Angular</span>, and{' '}
          <span className="badge !text-fg">Flutter</span>{' '}
          to build efficient, scalable systems while driving rapid technical growth.
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col-reverse gap-1 bg-surface p-4 sm:p-5">
                <dt className="flex items-center gap-2 font-mono text-xs text-fg-subtle">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {stat.label}
                </dt>
                <dd className="text-2xl font-semibold tracking-tight">{stat.value}</dd>
              </div>
            );
          })}
        </dl>
      </Reveal>

      {/* Technical skills */}
      <section aria-labelledby="tech-skills-title" className="mt-20 md:mt-24">
        <SectionHeader id="tech-skills-title" eyebrow="// Breakdown" title="Technical Skills" level="h3" />
        <Reveal className="surface p-6 sm:p-8 md:p-10">
          <SkillsRingChart />
        </Reveal>
      </section>

      {/* Professional journey */}
      <section aria-labelledby="journey-title" className="mt-20 md:mt-24">
        <SectionHeader id="journey-title" eyebrow="// Timeline" title="Professional Journey" level="h3" />
        <ol className="relative space-y-4 border-l border-border pl-6 sm:pl-8">
          {timeline.map((item) => (
            <Reveal as="li" key={item.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[calc(1.5rem+4.5px)] top-6 h-2 w-2 rounded-full bg-accent ring-4 ring-bg sm:-left-[calc(2rem+4.5px)]"
              />
              <article className="surface flex flex-col overflow-hidden sm:flex-row">
                <div className="aspect-[16/9] shrink-0 overflow-hidden border-b border-border bg-surface-2 sm:aspect-auto sm:h-auto sm:w-48 sm:border-b-0 sm:border-r md:w-56">
                  <Picture
                    picture={item.image}
                    alt={`${item.title} - ${item.org}`}
                    sizes="(min-width: 768px) 224px, (min-width: 640px) 192px, 100vw"
                    pictureClassName="block h-full w-full"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 p-5 sm:p-6">
                  <p className="font-mono text-xs text-accent">{item.year}</p>
                  <h4 className="mt-2 text-lg font-semibold tracking-tight">{item.title}</h4>
                  <p className="mt-0.5 text-sm text-fg-muted">{item.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </section>
    </div>
  );
}
