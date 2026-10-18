/**
 * Single source of truth for skills. Merged and de-duplicated from the former
 * HomePage "My Tech Stack", AboutPage `techStack` / `softSkills`, and the
 * ResumePage skills chart. Nothing here was added beyond those lists.
 */

export type BrandIcon =
  | 'node' | 'express' | 'php' | 'firebase'
  | 'react' | 'angular' | 'html' | 'css' | 'tailwind'
  | 'mysql' | 'flutter'
  | 'git' | 'vscode' | 'postman' | 'figma'
  | 'adaptability' | 'problem-solving' | 'teamwork' | 'fast-learning' | 'communication' | 'critical-thinking';

export interface Skill {
  name: string;
  /** One or more icons (HTML5/CSS3 shows both marks). */
  icons?: BrandIcon[];
}

export interface SkillGroup {
  category: 'Backend' | 'Frontend' | 'Database' | 'Mobile' | 'Dev Tools' | 'Soft Skills';
  skills: Skill[];
  /** Bento tile footprint on the 4-column desktop grid. */
  span: 'lg' | 'wide' | 'sm';
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Backend',
    span: 'lg',
    skills: [
      { name: 'Node.js', icons: ['node'] },
      { name: 'Express', icons: ['express'] },
      { name: 'PHP', icons: ['php'] },
      { name: 'Firebase', icons: ['firebase'] },
    ],
  },
  {
    category: 'Frontend',
    span: 'wide',
    skills: [
      { name: 'React', icons: ['react'] },
      { name: 'Angular', icons: ['angular'] },
      { name: 'HTML5/CSS3', icons: ['html', 'css'] },
      { name: 'Tailwind', icons: ['tailwind'] },
    ],
  },
  { category: 'Database', span: 'sm', skills: [{ name: 'MySQL', icons: ['mysql'] }] },
  { category: 'Mobile', span: 'sm', skills: [{ name: 'Flutter', icons: ['flutter'] }] },
  {
    category: 'Dev Tools',
    span: 'wide',
    skills: [
      { name: 'Git/GitHub', icons: ['git'] },
      { name: 'VS Code', icons: ['vscode'] },
      { name: 'Postman', icons: ['postman'] },
      { name: 'Figma', icons: ['figma'] },
    ],
  },
  {
    category: 'Soft Skills',
    span: 'wide',
    skills: [
      { name: 'Adaptability', icons: ['adaptability'] },
      { name: 'Problem Solving', icons: ['problem-solving'] },
      { name: 'Team Collaboration', icons: ['teamwork'] },
      { name: 'Fast Learning', icons: ['fast-learning'] },
      { name: 'Communication', icons: ['communication'] },
      { name: 'Critical Thinking', icons: ['critical-thinking'] },
    ],
  },
];

/** Resume "Technical Skills" breakdown, moved verbatim from ResumePage. */
export const SKILL_BREAKDOWN = [
  { label: 'Backend', pct: 50, items: ['Node.js', 'PHP', 'MySQL', 'Firebase', 'Express'] },
  { label: 'DevTools', pct: 30, items: ['Git/GitHub', 'VS Code', 'Postman', 'Figma'] },
  { label: 'Frontend', pct: 20, items: ['React', 'Angular', 'Flutter', 'HTML5/CSS3', 'Tailwind'] },
] as const;
