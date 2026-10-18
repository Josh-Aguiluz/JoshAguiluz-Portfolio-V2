import React from 'react';
import { Github } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCardDeck from '../components/GlassCardDeck';
import firstProj from '../assets/firstProj.webp';
import danonosWebp from '../assets/danonos.webp';
import ecoQuestWebp from '../assets/ecoQuest.webp';
import wellnessWebp from '../assets/wellness.webp';
import chanelWebp from '../assets/chanel.webp';

const PROJECTS = [
  {
    title: "Danono's Bakery",
    description: "As the Backend & Full-Stack Developer, I built a premium e-commerce bakery platform for Danono's in Angeles City.",
    role: 'Backend & Full-Stack Developer',
    tags: ['PHP', 'CSS', 'JAVASCRIPT', 'E-COMMERCE'],
    github: 'https://github.com/gabewebd/WSEA.git',
    live: 'https://danonos.com',
    image: danonosWebp,
    details: [
      "As the Backend & Full-Stack Developer for Danono's Bakery, I was responsible for the entire server-side architecture and frontend implementation of this real-world e-commerce platform for a bakery based in Angeles City, Pampanga.",
      "I developed the backend logic using PHP, handling product catalog management, order processing, and customer data. The server-side code ensures seamless ordering functionality, allowing customers to browse the menu and place orders for their signature 24-hour fermented brioche doughnuts.",
      "On the frontend, I designed and implemented a vibrant, fully responsive UI using CSS and JavaScript that showcases the bakery's brand identity. The design emphasizes visual appeal with high-quality imagery and smooth interactions to create an engaging user experience.",
      "This project taught me the importance of bridging design with functionality — building a system that not only looks premium but also handles real customer transactions reliably. The site is live and actively serving the business at danonos.com."
    ]
  },
  {
    title: 'HAU Eco-Quest',
    description: 'As the Backend & Full-Stack Developer, I architected a gamified sustainability platform with JWT auth and RBAC.',
    role: 'Backend & Full-Stack Developer',
    tags: ['REACT', 'NODE.JS', 'MONGODB', 'JWT'],
    github: 'https://github.com/Josh-Aguiluz/6WCSERVER-Final-Project.git',
    live: 'https://hauecoquest.vercel.app',
    image: ecoQuestWebp,
    details: [
      "As the Backend & Full-Stack Developer for HAU Eco-Quest, I architected and built this gamified sustainability platform from the ground up using the MERN Stack (MongoDB, Express.js, React, Node.js).",
      "My primary responsibility was designing and implementing the entire backend infrastructure. This included building secure RESTful API endpoints, integrating JWT-based authentication for user sessions, and implementing Role-Based Access Control (RBAC) to differentiate between admin and regular user permissions.",
      "I designed the MongoDB data layer with Mongoose schemas to manage user profiles, sustainability challenges, leaderboards, and activity tracking. The backend handles complex game logic including point systems, badge achievements, and progress tracking that gamifies eco-friendly actions on campus.",
      "On the frontend, I worked with React to build the user-facing interface that connects to the API, displaying real-time leaderboards, challenge progress, and user dashboards. The application is deployed on Vercel and demonstrates my ability to build and deploy production-ready full-stack applications."
    ]
  },
  {
    title: 'The Wellness Apparel',
    description: 'As the Project Leader & Full-Stack Developer, I led the team and built a complete e-commerce application.',
    role: 'Project Leader & Full-Stack Developer',
    tags: ['PHP', 'MYSQL', 'BOOTSTRAP', 'E-COMMERCE'],
    github: 'https://github.com/gabewebd/the-wellness-apparel',
    live: 'http://the-wellness-apparel.onlinewebshop.net',
    image: wellnessWebp,
    details: [
      "As the Project Leader and Full-Stack Developer for The Wellness Apparel, I spearheaded the entire development lifecycle of this e-commerce platform — from planning and task delegation to hands-on coding and deployment.",
      "In my leadership role, I coordinated the development workflow across the team, conducted code reviews, set milestones, and ensured timely delivery. I made key architectural decisions including the database schema design, authentication flow, and the admin panel structure.",
      "On the technical side, I built a custom Admin Content Management System (CMS) that allows the store owner to manage products, categories, and inventory in real time. I implemented secure shopping cart logic with session management, order processing, and input validation to prevent common security vulnerabilities.",
      "The backend is powered by PHP with MySQL for persistent data storage, handling product CRUD operations, user authentication, and order management. The frontend uses Bootstrap for responsive design, ensuring a consistent shopping experience across all devices. This project strengthened both my technical skills and my ability to lead a development team effectively."
    ]
  },
  {
    title: 'Chanel Website Replica',
    description: 'As a Frontend Developer in a team of four, I helped build a pixel-perfect, responsive Chanel clone.',
    role: 'Frontend Developer',
    tags: ['HTML5', 'CSS3', 'TYPESCRIPT', 'UI/UX'],
    github: 'https://github.com/gabewebd/6AWEB-TheFourWhoAdore.git',
    live: 'https://prelim-project-thefourwhoadore.netlify.app/home',
    image: chanelWebp,
    details: [
      "As a Frontend Developer in a team of four (\"The Four Who Adore\"), I contributed to engineering a pixel-perfect, fully responsive clone of the Chanel luxury fashion website as an academic project.",
      "My responsibilities included implementing key UI components such as navigation menus, product display grids, and interactive gallery sections. I focused on achieving visual fidelity to the original Chanel website while ensuring cross-browser compatibility across Chrome, Firefox, and Edge.",
      "The project was built using HTML5, CSS3, and TypeScript, with a strong emphasis on semantic markup, CSS Grid/Flexbox layouts, and responsive design principles. I ensured that the site maintained its premium look and feel across all screen sizes, from mobile to ultra-wide displays.",
      "This collaborative project strengthened my frontend development skills and taught me the importance of precision in UI/UX implementation. Working as a team also improved my skills in version control with Git, code collaboration, and maintaining consistent code standards across multiple developers."
    ]
  },
  {
    title: 'Furry Feast',
    description: 'My first frontend project using HTML, CSS, and JS — building a responsive, interactive pet food website.',
    role: 'Frontend Developer',
    tags: ['HTML5', 'CSS3', 'JAVASCRIPT', 'UI/UX'],
    github: 'https://github.com/Josh-Aguiluz/Furry-Feast.git',
    live: 'https://furry-feast.netlify.app/',
    image: firstProj,
    details: [
      "Furry Feast was my very first project stepping into frontend development. It was an exciting journey of taking design concepts and translating them into a functional website using the core pillars of the web: HTML, CSS, and JavaScript.",
      "Through this project, I learned the fundamentals of semantic HTML structure, building responsive layouts with CSS Flexbox and media queries, and adding essential interactivity using Vanilla JavaScript.",
      "This foundational project ignited my passion for frontend engineering, teaching me the importance of clean code and responsive design. It marks the milestone where my journey to becoming a professional web developer officially began."
    ]
  },
];

export default function ProjectsPage() {

  return (
    <section className="min-h-screen py-20 md:py-32 watermark-bg relative overflow-hidden bg-transparent">
      {/* Watermark Numbers */}
      <div className="watermark-number top-[-50px] right-[-20px] md:top-[-100px] md:right-[-50px] opacity-25 md:opacity-50 scale-50 md:scale-100 origin-top-right">01</div>
      <div className="watermark-number bottom-[-50px] left-[-20px] md:bottom-[-100px] md:left-[-50px] opacity-25 md:opacity-50 scale-50 md:scale-100 origin-bottom-left">02</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block px-6 md:px-10 py-2 md:py-4 bg-[#A47A2D] dark:bg-[#A47A2D] rounded-full mb-6 md:mb-8"
          >
            <p className="font-mono text-base md:text-[24px] font-bold text-white dark:text-[#1A1715] uppercase tracking-wider">
              // Projects
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'Michroma, sans-serif' }}
            className="text-4xl sm:text-6xl lg:text-7xl leading-tight font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mb-4 md:mb-6"
          >
            My Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-[28px] font-bold text-[#521D07] dark:text-[#B8B0A6] max-w-3xl mx-auto px-2 md:px-4"
          >
            A collection of projects showcasing my backend development skills,
            full-stack capabilities, and problem-solving approach.
          </motion.p>
        </div>

        {/* Glass Card Deck */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <GlassCardDeck projects={PROJECTS} />
        </motion.div>

        {/* Featured Section */}
        <div className="sticker-card bg-[#D4AF37] dark:bg-[#C9A232] p-6 md:p-12 text-center border-4 border-[#3E3632] dark:border-[#E2E8F0] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="2" className="text-white dark:text-black" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <h3 style={{ fontFamily: 'Michroma, sans-serif' }} className="text-3xl md:text-[48px] font-black text-[#521D07] dark:text-[#521D07] uppercase mb-4 md:mb-6 relative z-10">
            Want To See More?
          </h3>
          <p className="text-lg md:text-[24px] font-bold text-[#521D07] dark:text-[#521D07] mb-6 md:mb-8 max-w-2xl mx-auto relative z-10">
            Check out my GitHub profile for additional projects, contributions,
            and code samples that showcase my development journey.
          </p>
          <a
            href="https://github.com/Josh-Aguiluz"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button px-8 md:px-12 py-4 md:py-6 bg-[#3E3632] dark:bg-[#E2E8F0] text-white dark:text-[#1A1715] text-lg md:text-[24px] inline-flex items-center gap-2 md:gap-3 relative z-10 hover:scale-105 transition-transform"
          >
            <Github className="w-6 h-6 md:w-8 md:h-8" />
            Visit GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}