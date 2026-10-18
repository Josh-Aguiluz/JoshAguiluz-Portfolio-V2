import type { PictureData } from '../components/Picture';
import danonosImg from '../assets/danonos.webp?w=480;800;1200&format=avif;webp&as=picture';
import ecoQuestImg from '../assets/ecoQuest.webp?w=480;800;1200&format=avif;webp&as=picture';
import wellnessImg from '../assets/wellness.webp?w=480;800;1200&format=avif;webp&as=picture';
import chanelImg from '../assets/chanel.webp?w=480;800;1200&format=avif;webp&as=picture';
import furryFeastImg from '../assets/firstProj.webp?w=480;800;1200&format=avif;webp&as=picture';

export interface Project {
  title: string;
  description: string;
  role: string;
  tags: string[];
  github: string;
  live: string;
  image: PictureData;
  /** Original long-form write-up (kept verbatim). */
  details: string[];
  /** Technical View fields. Every phrase below is taken from this project's `details`. */
  problem: string;
  architecture: string[];
  deployment?: string;
  highlights: string[];
  /** Shown in the short "Selected Work" teaser on the home section. */
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    title: "Danono's Bakery",
    description: "As the Backend & Full-Stack Developer, I built a premium e-commerce bakery platform for Danono's in Angeles City.",
    role: 'Backend & Full-Stack Developer',
    tags: ['PHP', 'CSS', 'JAVASCRIPT', 'E-COMMERCE'],
    github: 'https://github.com/gabewebd/WSEA.git',
    live: 'https://danonos.com',
    image: danonosImg,
    featured: true,
    details: [
      "As the Backend & Full-Stack Developer for Danono's Bakery, I was responsible for the entire server-side architecture and frontend implementation of this real-world e-commerce platform for a bakery based in Angeles City, Pampanga.",
      "I developed the backend logic using PHP, handling product catalog management, order processing, and customer data. The server-side code ensures seamless ordering functionality, allowing customers to browse the menu and place orders for their signature 24-hour fermented brioche doughnuts.",
      "On the frontend, I designed and implemented a vibrant, fully responsive UI using CSS and JavaScript that showcases the bakery's brand identity. The design emphasizes visual appeal with high-quality imagery and smooth interactions to create an engaging user experience.",
      "This project taught me the importance of bridging design with functionality — building a system that not only looks premium but also handles real customer transactions reliably. The site is live and actively serving the business at danonos.com."
    ],
    problem:
      'A real-world e-commerce platform for a bakery in Angeles City, Pampanga, letting customers browse the menu and place orders for its signature 24-hour fermented brioche doughnuts.',
    architecture: ['Responsive UI (CSS + JavaScript)', 'PHP server-side logic'],
    deployment: 'Live at danonos.com',
    highlights: [
      'Owned the entire server-side architecture and frontend implementation',
      'PHP backend for product catalog management, order processing and customer data',
      "Fully responsive UI in CSS and JavaScript built around the bakery's brand identity",
      'Handles real customer transactions for a live business',
    ],
  },
  {
    title: 'HAU Eco-Quest',
    description: 'As the Backend & Full-Stack Developer, I architected a gamified sustainability platform with JWT auth and RBAC.',
    role: 'Backend & Full-Stack Developer',
    tags: ['REACT', 'NODE.JS', 'MONGODB', 'JWT'],
    github: 'https://github.com/Josh-Aguiluz/6WCSERVER-Final-Project.git',
    live: 'https://hauecoquest.vercel.app',
    image: ecoQuestImg,
    featured: true,
    details: [
      "As the Backend & Full-Stack Developer for HAU Eco-Quest, I architected and built this gamified sustainability platform from the ground up using the MERN Stack (MongoDB, Express.js, React, Node.js).",
      "My primary responsibility was designing and implementing the entire backend infrastructure. This included building secure RESTful API endpoints, integrating JWT-based authentication for user sessions, and implementing Role-Based Access Control (RBAC) to differentiate between admin and regular user permissions.",
      "I designed the MongoDB data layer with Mongoose schemas to manage user profiles, sustainability challenges, leaderboards, and activity tracking. The backend handles complex game logic including point systems, badge achievements, and progress tracking that gamifies eco-friendly actions on campus.",
      "On the frontend, I worked with React to build the user-facing interface that connects to the API, displaying real-time leaderboards, challenge progress, and user dashboards. The application is deployed on Vercel and demonstrates my ability to build and deploy production-ready full-stack applications."
    ],
    problem:
      'A gamified sustainability platform that turns eco-friendly actions on campus into challenges, points, badges and leaderboards.',
    architecture: ['React', 'Node.js + Express REST API (JWT, RBAC)', 'MongoDB / Mongoose'],
    deployment: 'Deployed on Vercel',
    highlights: [
      'Designed and implemented the entire backend infrastructure',
      'Secure RESTful API with JWT-based authentication and role-based access control for admin and regular users',
      'Mongoose schemas for user profiles, sustainability challenges, leaderboards and activity tracking',
      'Game logic for point systems, badge achievements and progress tracking',
    ],
  },
  {
    title: 'The Wellness Apparel',
    description: 'As the Project Leader & Full-Stack Developer, I led the team and built a complete e-commerce application.',
    role: 'Project Leader & Full-Stack Developer',
    tags: ['PHP', 'MYSQL', 'BOOTSTRAP', 'E-COMMERCE'],
    github: 'https://github.com/gabewebd/the-wellness-apparel',
    live: 'http://the-wellness-apparel.onlinewebshop.net',
    image: wellnessImg,
    details: [
      "As the Project Leader and Full-Stack Developer for The Wellness Apparel, I spearheaded the entire development lifecycle of this e-commerce platform — from planning and task delegation to hands-on coding and deployment.",
      "In my leadership role, I coordinated the development workflow across the team, conducted code reviews, set milestones, and ensured timely delivery. I made key architectural decisions including the database schema design, authentication flow, and the admin panel structure.",
      "On the technical side, I built a custom Admin Content Management System (CMS) that allows the store owner to manage products, categories, and inventory in real time. I implemented secure shopping cart logic with session management, order processing, and input validation to prevent common security vulnerabilities.",
      "The backend is powered by PHP with MySQL for persistent data storage, handling product CRUD operations, user authentication, and order management. The frontend uses Bootstrap for responsive design, ensuring a consistent shopping experience across all devices. This project strengthened both my technical skills and my ability to lead a development team effectively."
    ],
    problem:
      'A complete e-commerce platform where the store owner manages products, categories and inventory in real time, with a consistent shopping experience across all devices.',
    architecture: ['Bootstrap (responsive UI)', 'PHP (auth, product CRUD, orders)', 'MySQL'],
    highlights: [
      'Led the team: coordinated the workflow, ran code reviews and set milestones',
      'Designed the database schema, authentication flow and admin panel structure',
      'Custom admin CMS for products, categories and inventory',
      'Session-based shopping cart, order processing and input validation against common security vulnerabilities',
    ],
  },
  {
    title: 'Chanel Website Replica',
    description: 'As a Frontend Developer in a team of four, I helped build a pixel-perfect, responsive Chanel clone.',
    role: 'Frontend Developer',
    tags: ['HTML5', 'CSS3', 'TYPESCRIPT', 'UI/UX'],
    github: 'https://github.com/gabewebd/6AWEB-TheFourWhoAdore.git',
    live: 'https://prelim-project-thefourwhoadore.netlify.app/home',
    image: chanelImg,
    featured: true,
    details: [
      "As a Frontend Developer in a team of four (\"The Four Who Adore\"), I contributed to engineering a pixel-perfect, fully responsive clone of the Chanel luxury fashion website as an academic project.",
      "My responsibilities included implementing key UI components such as navigation menus, product display grids, and interactive gallery sections. I focused on achieving visual fidelity to the original Chanel website while ensuring cross-browser compatibility across Chrome, Firefox, and Edge.",
      "The project was built using HTML5, CSS3, and TypeScript, with a strong emphasis on semantic markup, CSS Grid/Flexbox layouts, and responsive design principles. I ensured that the site maintained its premium look and feel across all screen sizes, from mobile to ultra-wide displays.",
      "This collaborative project strengthened my frontend development skills and taught me the importance of precision in UI/UX implementation. Working as a team also improved my skills in version control with Git, code collaboration, and maintaining consistent code standards across multiple developers."
    ],
    problem:
      'An academic project to engineer a pixel-perfect, fully responsive clone of the Chanel luxury fashion website as a team of four.',
    architecture: ['HTML5 (semantic markup)', 'CSS3 (Grid / Flexbox)', 'TypeScript'],
    highlights: [
      'Built navigation menus, product display grids and interactive gallery sections',
      'Visual fidelity to the original site, cross-browser across Chrome, Firefox and Edge',
      'Responsive from mobile to ultra-wide displays',
      'Team workflow with Git version control and consistent code standards',
    ],
  },
  {
    title: 'Furry Feast',
    description: 'My first frontend project using HTML, CSS, and JS — building a responsive, interactive pet food website.',
    role: 'Frontend Developer',
    tags: ['HTML5', 'CSS3', 'JAVASCRIPT', 'UI/UX'],
    github: 'https://github.com/Josh-Aguiluz/Furry-Feast.git',
    live: 'https://furry-feast.netlify.app/',
    image: furryFeastImg,
    details: [
      "Furry Feast was my very first project stepping into frontend development. It was an exciting journey of taking design concepts and translating them into a functional website using the core pillars of the web: HTML, CSS, and JavaScript.",
      "Through this project, I learned the fundamentals of semantic HTML structure, building responsive layouts with CSS Flexbox and media queries, and adding essential interactivity using Vanilla JavaScript.",
      "This foundational project ignited my passion for frontend engineering, teaching me the importance of clean code and responsive design. It marks the milestone where my journey to becoming a professional web developer officially began."
    ],
    problem: 'My first frontend project: translating design concepts into a functional, responsive pet food website.',
    architecture: ['Semantic HTML', 'CSS Flexbox + media queries', 'Vanilla JavaScript'],
    highlights: [
      'Semantic HTML structure',
      'Responsive layouts with CSS Flexbox and media queries',
      'Interactivity with vanilla JavaScript',
    ],
  },
];
