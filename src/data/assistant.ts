/**
 * Knowledge base for the portfolio assistant (option A: scripted, no AI service).
 * Every answer is built from text that already appears on the site. Skills and
 * projects are read from their data files, so they stay in sync automatically.
 *
 * To upgrade to a real AI later, keep this file as the model's context and swap
 * `answer()` for a call to a server function.
 */
import { PROJECTS } from './projects';
import { SKILL_GROUPS } from './skills';
import resumePdf from '../assets/resume.pdf';

const EMAIL_LINK = 'https://mail.google.com/mail/?view=cm&fs=1&to=josh.dizon.aguiluz25@gmail.com';
const GITHUB = 'https://github.com/Josh-Aguiluz';
const LINKEDIN = 'https://www.linkedin.com/in/josh-aguiluz-0a150a350/';

// Mirrors the certifications on the About section (that data is kept frozen in AboutPage).
const CERTIFICATIONS = [
  'JavaScript Fundamentals (FreeAcademy.ai)',
  'HTML Fundamentals (FreeAcademy.ai)',
  'PHP Basics (Simplilearn)',
  'CompTIA IT Fundamentals (CompTIA)',
  'CCNA: Introduction to Networks (Cisco)',
  'AWS Certified (AWS)',
];

// Mirrors the Blog section post titles.
const BLOG_POSTS = ['My Journey to Top 1%', 'My Life as an HAU Student', 'Coding as My Daily Life'];

export type SectionTarget = 'home' | 'about' | 'skills-title' | 'certifications-title' | 'projects' | 'resume' | 'blog' | 'contact';

export interface BotReply {
  text: string;
  /** Set on real-AI replies so they can be sent back as conversation history. */
  aiText?: string;
  list?: string[];
  links?: { label: string; href: string; download?: string }[];
  actions?: { label: string; target: SectionTarget }[];
}

export const QUICK_REPLIES = ['Who is Josh?', 'Tech stack', 'Projects', 'Certifications', 'Download resume', 'Contact'];

export const GREETING: BotReply = {
  text: "Hi! I'm Josh's portfolio assistant. Ask me about his skills, projects, certifications or education, or tell me where to go and I'll take you there.",
};

const SECTION_NAMES: { target: SectionTarget; label: string; words: string[] }[] = [
  { target: 'home', label: 'Home', words: ['home', 'top', 'start'] },
  { target: 'about', label: 'About', words: ['about', 'bio'] },
  { target: 'skills-title', label: 'Skills', words: ['skills', 'skill'] },
  { target: 'certifications-title', label: 'Certifications', words: ['certifications', 'certificates', 'certs'] },
  { target: 'projects', label: 'Projects', words: ['projects', 'project', 'work', 'portfolio'] },
  { target: 'resume', label: 'Resume', words: ['resume', 'cv'] },
  { target: 'blog', label: 'Blog', words: ['blog', 'articles', 'posts'] },
  { target: 'contact', label: 'Contact', words: ['contact'] },
];

const normalize = (s: string) =>
  s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9.+#/ ]+/g, ' ').replace(/\s+/g, ' ').trim();

const has = (q: string, words: string[]) => words.some((w) => new RegExp(`(^|\\s)${w.replace(/[.+]/g, '\\$&')}`).test(q));

interface Intent {
  words: string[];
  reply: () => BotReply;
}

const projectIntents: Intent[] = PROJECTS.map((p) => ({
  words: [normalize(p.title), ...normalize(p.title).split(' ').filter((w) => w.length > 4 && !['website', 'replica'].includes(w))],
  reply: () => ({
    text: `${p.title}: ${p.description}`,
    list: [`Role: ${p.role}`, `Tech: ${p.tags.join(', ')}`],
    links: [
      { label: 'Live site', href: p.live },
      { label: 'Source code', href: p.github },
    ],
    actions: [{ label: 'Go to Projects', target: 'projects' }],
  }),
}));

const skillsReply = (): BotReply => ({
  text: 'Josh is backend first, with the frontend, mobile and tooling range to ship complete products:',
  list: SKILL_GROUPS.filter((g) => g.category !== 'Soft Skills').map((g) => `${g.category}: ${g.skills.map((s) => s.name).join(', ')}`),
  actions: [{ label: 'Go to Skills', target: 'skills-title' }],
});

const INTENTS: Intent[] = [
  ...projectIntents,
  {
    words: ['hi', 'hello', 'hey', 'yo', 'good morning', 'good evening'],
    reply: () => GREETING,
  },
  {
    words: ['who', 'about', 'yourself', 'introduce', 'bio'],
    reply: () => ({
      text: 'Josh Andrei Aguiluz is a BS Information Technology student at Holy Angel University, ranked Top 1% in the Web Development track. He combines strong backend logic with frontend adaptability to build efficient, scalable systems that solve real-world problems.',
      actions: [{ label: 'Go to About', target: 'about' }],
    }),
  },
  {
    words: ['backend', 'server', 'api', 'node', 'express', 'php', 'firebase'],
    reply: () => {
      const backend = SKILL_GROUPS.find((g) => g.category === 'Backend')!;
      const db = SKILL_GROUPS.find((g) => g.category === 'Database')!;
      return {
        text: 'Backend is his specialty: building efficient, scalable backend systems that solve real-world problems.',
        list: [`Backend: ${backend.skills.map((s) => s.name).join(', ')}`, `Database: ${db.skills.map((s) => s.name).join(', ')}`],
        actions: [{ label: 'Go to Skills', target: 'skills-title' }],
      };
    },
  },
  {
    words: ['skills', 'skill', 'stack', 'tech', 'technologies', 'tools', 'languages', 'frontend', 'react', 'angular', 'flutter', 'mobile', 'database', 'mysql'],
    reply: skillsReply,
  },
  {
    words: ['hobby', 'hobbies', 'free time', 'fun', 'interests', 'interest', 'passion', 'enjoy', 'likes', 'weekends'],
    reply: () => ({
      text: 'Coding! For Josh, programming is more than a required subject: it has become his passion, his hobby, and his daily routine. Even on weekends or holidays, you will likely find him at his desk, dark mode enabled, building something new.',
      actions: [{ label: 'Read his blog', target: 'blog' }],
    }),
  },
  {
    words: ['soft skills', 'strengths', 'personality', 'teamwork'],
    reply: () => ({
      text: 'His soft skills:',
      list: SKILL_GROUPS.find((g) => g.category === 'Soft Skills')!.skills.map((s) => s.name),
      actions: [{ label: 'Go to Skills', target: 'skills-title' }],
    }),
  },
  {
    words: ['projects', 'project', 'built', 'work', 'portfolio', 'apps'],
    reply: () => ({
      text: `Josh has ${PROJECTS.length} featured projects. Ask about any of them by name:`,
      list: PROJECTS.map((p) => `${p.title} (${p.role})`),
      actions: [{ label: 'Go to Projects', target: 'projects' }],
    }),
  },
  {
    words: ['cert', 'certs', 'certificate', 'certificates', 'certification', 'certifications', 'credential', 'credentials', 'aws', 'ccna', 'cisco', 'comptia'],
    reply: () => ({
      text: 'Josh holds 6+ certifications, including:',
      list: CERTIFICATIONS,
      actions: [{ label: 'Go to Certifications', target: 'certifications-title' }],
    }),
  },
  {
    words: ['education', 'school', 'university', 'college', 'study', 'studying', 'student', 'hau', 'holy angel', 'degree', 'rank', 'top 1'],
    reply: () => ({
      text: 'Education:',
      list: [
        'BS Information Technology, Holy Angel University (2023 - 2027). Major within Web Development Track. Top 1% ranking Academic Scholar.',
        'STEM Strand, Angeles City Science High School (2017 - 2022). Graduated with High Honors.',
      ],
      actions: [{ label: 'Go to Resume', target: 'resume' }],
    }),
  },
  {
    words: ['resume', 'cv', 'download'],
    reply: () => ({
      text: 'Here is Josh’s resume:',
      links: [{ label: 'Download resume (PDF)', href: resumePdf, download: 'Josh_Aguiluz_Resume.pdf' }],
      actions: [{ label: 'Go to Resume', target: 'resume' }],
    }),
  },
  {
    words: ['hire', 'hiring', 'available', 'availability', 'internship', 'intern', 'job', 'opportunity', 'opportunities', 'work with'],
    reply: () => ({
      text: 'Yes! Josh is available for work and actively seeking internship opportunities, specifically a Backend Developer internship, where he can contribute to impactful projects and grow as a developer.',
      actions: [{ label: 'Go to Contact', target: 'contact' }],
    }),
  },
  {
    words: ['contact', 'email', 'reach', 'message', 'talk', 'linkedin', 'github', 'socials'],
    reply: () => ({
      text: 'You can reach Josh here, or send a message through the contact form:',
      links: [
        { label: 'Email', href: EMAIL_LINK },
        { label: 'LinkedIn', href: LINKEDIN },
        { label: 'GitHub', href: GITHUB },
      ],
      actions: [{ label: 'Go to Contact', target: 'contact' }],
    }),
  },
  {
    words: ['location', 'where', 'live', 'based', 'pampanga', 'magalang', 'philippines'],
    reply: () => ({ text: 'Josh is based in Magalang, Pampanga.', actions: [{ label: 'Go to Contact', target: 'contact' }] }),
  },
  {
    words: ['blog', 'articles', 'article', 'posts'],
    reply: () => ({
      text: 'Stories, lessons, and insights from his development journey:',
      list: BLOG_POSTS,
      actions: [{ label: 'Go to Blog', target: 'blog' }],
    }),
  },
  {
    words: ['thanks', 'thank you', 'ty', 'bye', 'goodbye', 'great', 'cool', 'nice'],
    reply: () => ({ text: 'Happy to help! Anything else you want to know about Josh?' }),
  },
];

const FALLBACK: BotReply = {
  text: "I can only answer questions about Josh and this portfolio. Try one of the suggestions below, or ask about his skills, projects, certifications, education or how to contact him.",
};

/** Navigation commands: "go to projects", "take me to contact", "open the blog"... */
function navigationReply(q: string): BotReply | null {
  if (!has(q, ['go', 'take', 'open', 'show', 'navigate', 'jump', 'scroll', 'bring'])) return null;
  const section = SECTION_NAMES.find((s) => has(q, s.words));
  if (!section) return null;
  return { text: `Taking you to ${section.label}.`, actions: [{ label: `Go to ${section.label}`, target: section.target }] };
}

export interface Answer {
  reply: BotReply;
  /** Scroll there immediately (explicit navigation request). */
  navigateTo?: SectionTarget;
}

export function answer(input: string): Answer {
  const q = normalize(input);
  if (!q) return { reply: FALLBACK };

  const nav = navigationReply(q);
  if (nav) return { reply: nav, navigateTo: nav.actions![0].target };

  // Score every intent by how many of its keywords appear; longer phrases count more.
  let best: { intent: Intent; score: number } | null = null;
  for (const intent of INTENTS) {
    const score = intent.words.reduce((sum, w) => (has(q, [w]) ? sum + w.split(' ').length + (w.length > 6 ? 1 : 0) : sum), 0);
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }
  return { reply: best ? best.intent.reply() : FALLBACK };
}
