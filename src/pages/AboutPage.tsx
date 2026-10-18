import React from 'react';
import { ArrowRight } from 'lucide-react';
import phpBasicsImg from '../assets/phpBasics.webp';
import comptiaImg from '../assets/comptiaReal.webp';
import ccnaImg from '../assets/ccna.webp';
import awsImg from '../assets/aws.webp';
import phpBasicsPdf from '../assets/phpBasics.pdf';
import comptiaSource from '../assets/comptiaReal.webp';
import ccnaPdf from '../assets/ccna.pdf';
import awsPdf from '../assets/aws.pdf';
import htmlImg from '../assets/htmlFundamentals.webp';
import jsImg from '../assets/jsFundamentals.webp';
import profileImg from '../assets/casualProf.webp?w=400;640;960&format=avif;webp&as=picture';
import CertCoverflow from '../components/CertCoverflow';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import SkillsBento from '../components/SkillsBento';
import BioExplorer from '../components/explorer/BioExplorer';
import SkillsExplorer from '../components/explorer/SkillsExplorer';
import { ABOUT_LAYOUT } from '../config/layout';

export default function AboutPage() {
  const certifications = [
    {
      title: 'JavaScript Fundamentals',
      issuer: 'FREEACADEMY.AI',
      image: jsImg,
      link: 'https://freeacademy.ai/verify/FA-2026-JF-CULV6N',
      sourceFile: jsImg,
      description: 'Covers core JavaScript concepts across 37 lessons, verified by a passed final exam.',
      alt: 'JavaScript Fundamentals certificate of completion issued to Josh Aguiluz by FreeAcademy.ai'
    },
    {
      title: 'HTML Fundamentals',
      issuer: 'FREEACADEMY.AI',
      image: htmlImg,
      link: 'https://freeacademy.ai/verify/FA-2026-HF-DIZS8J',
      sourceFile: htmlImg,
      description: 'Covers semantic HTML and page structure across 32 lessons, verified by a passed final exam.',
      alt: 'HTML Fundamentals certificate of completion issued to Josh Aguiluz by FreeAcademy.ai'
    },
    {
      title: 'PHP Basics',
      issuer: 'SIMPLILEARN',
      image: phpBasicsImg,
      link: 'https://simpli-web.app.link/e/p6Kseqkvt1b',
      sourceFile: phpBasicsPdf,
      description: 'Demonstrates foundational knowledge in PHP server-side scripting.'
    },
    {
      title: 'CompTIA IT Fundamentals',
      issuer: 'COMPTIA',
      image: comptiaImg,
      link: 'https://www.credly.com/badges/e721a78b-70bc-43af-9726-7178adf7f5b3/public_url',
      sourceFile: comptiaSource,
      description: 'Validates foundational IT skills including hardware, software, and networking.'
    },
    {
      title: 'CCNA: Introduction to Networks',
      issuer: 'CISCO',
      image: ccnaImg,
      link: 'https://www.credly.com/badges/2ebb0a57-01e9-4b0f-9204-bb8ffcfba067/public_url',
      sourceFile: ccnaPdf,
      description: 'Demonstrates understanding of network architectures, models, and protocols.'
    },
    {
      title: 'AWS Certified',
      issuer: 'AWS',
      image: awsImg,
      link: 'https://www.credly.com/badges/3b16631a-9f77-4594-90b8-4c84c48b4dad/public_url',
      sourceFile: awsPdf,
      description: 'Validates overall understanding of the AWS Cloud platform and basic security.'
    }
  ];

  return (
    <div className="container-page section-y">
      <SectionHeader id="about-title" eyebrow="// About Me" title="Who I Am" />

      {ABOUT_LAYOUT === 'explorer' ? (
        <Reveal>
          <BioExplorer profileImg={profileImg} />
        </Reveal>
      ) : (
      /* Bio + photo (classic layout) */
      <div className="grid gap-6 md:grid-cols-[1.35fr_1fr] md:gap-8">
        <Reveal className="surface flex flex-col p-6 sm:p-8 md:p-10">
          <h3 className="text-h3 font-semibold">Josh Andrei Aguiluz</h3>
          <div className="mt-5 max-w-[65ch] space-y-4 text-[1.0625rem] leading-relaxed text-fg-muted">
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
          <blockquote className="mt-8 border-l-2 border-accent pl-4 font-mono text-sm leading-relaxed text-fg md:mt-auto md:pt-8">
            "Building efficient, scalable backend systems that solve real-world problems."
          </blockquote>
        </Reveal>

        <Reveal delay={0.05} className="surface relative overflow-hidden">
          <Picture
            picture={profileImg}
            alt="Josh Andrei Aguiluz - Backend Engineer Profile Photo"
            sizes="(min-width: 768px) 440px, 100vw"
            pictureClassName="block aspect-square h-full w-full md:aspect-auto"
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-4 left-4 rounded-md border border-white/15 bg-black/75 px-3 py-1.5 font-mono text-xs text-white">
            Backend Engineer
          </span>
        </Reveal>
      </div>
      )}

      {/* Skills */}
      <section aria-labelledby="skills-title" className="mt-24 md:mt-32">
        <SectionHeader id="skills-title" eyebrow="// Tools & Technologies" title="Skills" lede="Backend first, with the frontend, mobile and tooling range to ship complete products." />
        {ABOUT_LAYOUT === 'explorer' ? <SkillsExplorer /> : <SkillsBento />}
      </section>

      {/* Certifications */}
      {/* overflow-x clip: the tilted side cards peek past narrow viewports; extend to the edges, then clip */}
      <section aria-labelledby="certifications-title" className="-mx-4 mt-24 overflow-x-clip px-4 sm:-mx-6 sm:px-6 md:mt-32 lg:-mx-8 lg:px-8">
        <SectionHeader
          id="certifications-title"
          eyebrow="// Credentials"
          title="Certifications"
          lede="A specialized track record of my technical credentials and academic milestones."
          align="center"
        />
        <CertCoverflow certifications={certifications} />
      </section>

      {/* Call to Action */}
      <Reveal className="surface glow-top mt-24 flex flex-col items-start gap-6 p-8 md:mt-32 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="max-w-xl">
          <h3 className="text-h3 font-semibold">Let's Work Together</h3>
          <p className="mt-2 text-fg-muted">
            I'm actively seeking internship opportunities where I can contribute to
            impactful projects and grow as a developer.
          </p>
        </div>
        <a href="#contact" className="btn btn-primary shrink-0">
          Get In Touch
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </Reveal>
    </div>
  );
}
