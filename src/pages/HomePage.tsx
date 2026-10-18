import React from 'react';
import TypewriterTerminal from '../components/TypewriterTerminal';
import { motion } from 'framer-motion';
import { Award, Code2, Globe, Sparkles, Terminal, FileText, Download, Layers, TrendingUp, ArrowRight, ExternalLink, Calendar, Mail, MousePointer2, Lock, ChevronDown, Database } from 'lucide-react';
import homeBGHD from '../assets/homeBGHD.webp';
import resumePdf from '../assets/resume.pdf';
import GlassCardDeck from '../components/GlassCardDeck';
import ScrollVelocityText from '../components/ScrollVelocityText';
import danonosWebp from '../assets/danonos.webp';
import ecoQuestWebp from '../assets/ecoQuest.webp';
import chanelWebp from '../assets/chanel.webp';

export default function HomePage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Responsive background position — pushes image right on small screens
  const [bgPos, setBgPos] = React.useState('80% bottom');
  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setBgPos('right center');
      else if (w >= 640) setBgPos('75% center');
      else setBgPos('80% bottom');
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section className="relative overflow-hidden bg-transparent">

      {/* =====================================================
          HERO — Full-bleed background image
          Light mode: natural cream bg + dark text
          Dark mode: dark overlay + white text
          ===================================================== */}
      <div className="hero-bg-section relative min-h-screen flex items-center">

        {/* Background image layer — responsive positioning via bgPos state */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${homeBGHD})`,
            backgroundSize: 'cover',
            backgroundPosition: bgPos,
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* MOBILE / IPAD cream overlay for text readability — HIDDEN on desktop (lg:opacity-0) */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none lg:opacity-0 transition-opacity duration-300"
          style={{
            background:
              'linear-gradient(to right, rgba(253,245,231,0.92) 0%, rgba(253,245,231,0.85) 40%, rgba(253,245,231,0.5) 65%, transparent 90%)',
          }}
        />

        {/* DARK MODE overlay — hidden in light mode, shows in dark mode on ALL sizes */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-300 dark-hero-overlay"
          style={{
            background:
              'linear-gradient(105deg, rgba(20,8,2,0.98) 0%, rgba(26,14,4,0.95) 35%, rgba(40,18,6,0.85) 55%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* Subtle animated accents */}
        <motion.div
          className="absolute top-[20%] left-[8%] w-2 h-2 rounded-full bg-[#A47A2D] dark:bg-[#D4AF37] z-[2]"
          animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[55%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#521D07] dark:bg-[#FFA51F] z-[2]"
          animate={{ y: [8, -8, 8], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Decorative code brackets */}
        <div className="hidden lg:block absolute top-32 left-8 text-8xl opacity-[0.06] font-black text-[#521D07] dark:text-[#FDF5E7] dark-bracket-code z-[2]" style={{ fontFamily: 'monospace' }}>{'{'}</div>
        <div className="hidden lg:block absolute bottom-32 left-[28%] text-8xl opacity-[0.06] font-black text-[#521D07] dark:text-[#FDF5E7] dark-bracket-code z-[2]" style={{ fontFamily: 'monospace' }}>{'}'}</div>

        {/* ---- Hero Content ---- */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-32 lg:py-40">
          <div className="max-w-xl lg:max-w-2xl">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center relative px-8 sm:px-10 py-2.5 mb-8 rounded-full bg-[#521D07] dark:bg-[#3D2B1F]/90 border border-[#A47A2D]/40 dark:border-[#D4AF37]/50 backdrop-blur-md shadow-lg"
            >
              <div className="absolute left-3 sm:left-4 h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
              <p className="font-mono text-[10px] sm:text-xs md:text-sm font-bold text-white uppercase tracking-widest whitespace-nowrap">
                Available for Work
              </p>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-6"
            >
              <h1
                style={{ fontFamily: 'Michroma, sans-serif' }}
                className="text-4xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[1.05] font-black uppercase tracking-tight text-[#521D07] dark:text-[#FDF5E7] dark-hero-title"
              >
                BACKEND{' '}
                <br className="hidden sm:block" />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #A47A2D, #D4AF37, #A47A2D)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    animation: 'gradientShift 4s ease infinite',
                  }}
                >
                  ENGINEER
                </span>
              </h1>
            </motion.div>

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mb-6 max-w-lg"
            >
              <TypewriterTerminal />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl font-semibold leading-relaxed mb-20 max-w-lg text-[#521D07]/90 dark:text-[#E8DCC8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] dark-hero-desc"
            >
              Building{' '}
              <span className="text-[#A47A2D] dark:text-[#FFA51F] font-bold">efficient</span>,{' '}
              <span className="text-[#A47A2D] dark:text-[#FFA51F] font-bold">scalable systems</span>{' '}
              that solve real-world problems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-6 pt-4"
            >
              {/* Primary Button */}
              <button
                onClick={() => scrollToSection('projects')}
                className="split-btn split-espresso"
              >
                <div className="split-btn-text">View Projects</div>
                <div className="split-btn-icon-slot">
                  <Layers />
                </div>
              </button>

              {/* Secondary Button */}
              <button
                onClick={() => scrollToSection('contact')}
                className="split-btn split-gold"
              >
                <div className="split-btn-text">Contact Me</div>
                <div className="split-btn-icon-slot">
                  <Mail />
                </div>
              </button>

              {/* Tertiary Button - Download Resume */}
              <a
                href={resumePdf}
                download="Josh_Aguiluz_Resume.pdf"
                className="split-btn split-mocha"
              >
                <div className="split-btn-text">Resume</div>
                <div className="split-btn-icon-slot">
                  <Download />
                </div>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator - Perfectly Centered at Bottom */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center justify-center gap-4 pointer-events-none"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-mono text-[11px] md:text-[13px] font-black text-[#A47A2D] dark:text-[#A47A2D] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-10 rounded-full border-[3px] border-[#A47A2D] dark:border-[#A47A2D] flex items-start justify-center p-1.5 shadow-[0_0_15px_rgba(164,122,45,0.1)]">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#A47A2D] dark:bg-[#FFA51F]"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-5 h-5 text-[#A47A2D] mt-1" />
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom fade transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] bg-gradient-to-t from-[#FDF5E7] dark:from-[#1A1715] to-transparent pointer-events-none" />
      </div>
      <br></br> <br></br> <br></br> <br></br>
      {/* =====================================================
          CONTENT BELOW HERO — normal themed background
          ===================================================== */}
      <div className="relative z-10 bg-[#FDF5E7] dark:bg-[#1A1715]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto py-24 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="sticker-card bg-white dark:bg-[#252220] p-6 md:p-8 center-content border-4 border-[#A47A2D]"
            >
              <Layers className="w-10 h-10 md:w-12 md:h-12 text-[#A47A2D] mb-4 mx-auto" />
              <div className="text-[40px] md:text-[56px] font-black text-[#A47A2D] mb-2">5</div>
              <div className="text-[18px] md:text-[24px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase">Projects</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="sticker-card bg-white dark:bg-[#252220] p-6 md:p-8 center-content border-4 border-[#A47A2D]"
            >
              <Award className="w-10 h-10 md:w-12 md:h-12 text-[#A47A2D] mb-4 mx-auto" />
              <div className="text-[40px] md:text-[56px] font-black text-[#A47A2D] mb-2">6+</div>
              <div className="text-[18px] md:text-[24px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase">Certifications</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticker-card bg-white dark:bg-[#252220] p-6 md:p-8 center-content border-4 border-[#A47A2D]"
            >
              <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-[#A47A2D] mb-4 mx-auto" />
              <div className="text-[40px] md:text-[56px] font-black text-[#521D07] dark:text-[#E2E8F0] mb-2">Top 1%</div>
              <div className="text-[18px] md:text-[24px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase">Class Rank</div>
            </motion.div>
          </div>
        </div>
        <br></br> <br></br> <br></br>

        {/* Marquee Strip - Fixed with ScrollVelocity component - Small & Light Style */}
        <div className="mb-32">
          <ScrollVelocityText
            text="SCALABLE SYSTEMS /// ROBUST APIS /// CLEAN CODE /// PERFORMANCE OPTIMIZATION /// SCALABLE SYSTEMS /// ROBUST APIS /// CLEAN CODE"
            baseVelocity={1}
            fontSize="text-[28px] md:text-[36px]"
            padding="py-4"
            bgColor="bg-white dark:bg-[#1A1715]"
            textColor="text-[#A47A2D] dark:text-[#E2E8F0]"
            borderColor="border-[#A47A2D]/20 dark:border-[#D4AF37]/20"
          />
        </div>

        {/* Re-open constrained wrapper */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">

          {/* Tech Stack Showcase */}
          <div className="max-w-5xl mx-auto mt-8 pb-32">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-mono text-[16px] md:text-[20px] font-bold text-[#A47A2D] dark:text-[#D4AF37] tracking-wider"
              >
                {'// Core Technologies'}
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                style={{ fontFamily: 'Michroma, sans-serif' }}
                className="text-4xl md:text-[56px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mt-4"
              >
                My Tech Stack
              </motion.h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  name: 'React',
                  desc: 'Frontend',
                  color: '#61DAFB',
                  bgLight: '#E8F4F0',
                  bgDark: '#1C2A2E',
                  borderLight: '#61DAFB',
                  borderDark: '#3A8BA3',
                  iconSimple: (
                    <svg viewBox="-11.5 -10.232 23 20.463" className="w-16 h-16 md:w-20 md:h-20">
                      <circle r="2.05" fill="#61DAFB" />
                      <g stroke="#61DAFB" fill="none" strokeWidth="1">
                        <ellipse rx="11" ry="4.2" />
                        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                      </g>
                    </svg>
                  ),
                },
                {
                  name: 'Node.js',
                  desc: 'Backend',
                  color: '#339933',
                  bgLight: '#EAF2E4',
                  bgDark: '#1E2A1C',
                  borderLight: '#339933',
                  borderDark: '#2D7A2D',
                  iconSimple: (
                    <svg viewBox="0 0 256 289" className="w-16 h-16 md:w-20 md:h-20">
                      <path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.155.795-.53 1.855-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.08c0-1.325-.53-2.385-1.59-2.915L129.06 19.213c-1.06-.53-2.385-.53-3.18 0L20.14 80.165c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.635 7.95 25.44-1.325 25.44-10.6V93.15c0-1.59 1.325-3.18 3.18-3.18h13.515c1.59 0 3.18 1.325 3.18 3.18v121.11c0 20.936-11.395 33.126-31.27 33.126-6.095 0-10.865 0-24.38-6.625L11.13 224.33C4.24 220.355 0 212.935 0 205.25V83.08c0-7.685 4.24-15.105 11.13-19.08L116.87 2.783c6.625-3.71 15.635-3.71 22.26 0L244.87 64c6.89 3.975 11.13 11.395 11.13 19.08v122.17c0 7.685-4.24 15.105-11.13 19.08l-105.74 61.22c-3.445 1.854-7.42 2.914-11.13 2.914zm32.595-84.009c-46.29 0-55.83-21.2-55.83-39.22 0-1.59 1.325-3.18 3.18-3.18h13.78c1.59 0 2.915 1.06 2.915 2.65 2.12 14.045 8.215 20.936 36.305 20.936 22.26 0 31.8-5.035 31.8-16.96 0-6.89-2.65-11.925-37.365-15.37-28.887-2.915-46.82-9.275-46.82-32.33 0-21.465 18.2-34.185 48.675-34.185 34.185 0 51.18 11.925 53.3 37.365 0 .795-.265 1.59-.795 2.385-.53.53-1.325 1.06-2.12 1.06h-13.78c-1.325 0-2.65-1.06-2.915-2.385-3.18-14.575-11.395-19.345-33.655-19.345-24.91 0-27.825 8.745-27.825 15.105 0 7.95 3.445 10.07 36.305 14.575 32.595 4.505 47.88 10.865 47.88 32.86-.265 23.175-19.345 36.57-52.77 36.57z" fill="#339933" />
                    </svg>
                  ),
                },
                {
                  name: 'Flutter',
                  desc: 'Mobile',
                  color: '#02569B',
                  bgLight: '#E4EEF6',
                  bgDark: '#1A2230',
                  borderLight: '#47C5FB',
                  borderDark: '#2A7AB5',
                  iconSimple: (
                    <svg viewBox="0 0 256 317" className="w-16 h-16 md:w-20 md:h-20">
                      <defs>
                        <linearGradient x1="4%" y1="27%" x2="75%" y2="52%" id="a">
                          <stop stopColor="#1A237E" stopOpacity=".4" offset="0%" />
                          <stop stopColor="#1A237E" stopOpacity="0" offset="100%" />
                        </linearGradient>
                      </defs>
                      <path d="M157.666.001L.001 157.666 48.8 206.465 255.268.001z" fill="#47C5FB" />
                      <path d="M156.567 145.396L72.15 229.828 120.947 278.625 169.745 229.828 255.268 145.396z" fill="#47C5FB" />
                      <path d="M120.947 278.625L169.745 316.025 255.268 278.625 169.745 229.828z" fill="#00569E" />
                      <path d="M120.947 278.625L158.348 266.177 153.115 235.06z" fill="url(#a)" />
                    </svg>
                  ),
                },
                {
                  name: 'MySQL',
                  desc: 'Database',
                  color: '#4479A1',
                  bgLight: '#E6ECF2',
                  bgDark: '#1C2430',
                  borderLight: '#4479A1',
                  borderDark: '#365F80',
                  iconSimple: (
                    <Database className="w-16 h-16 md:w-20 md:h-20" color="#4479A1" strokeWidth={1.5} />
                  ),
                },
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  whileHover={{
                    y: -12,
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  className={`tech-card-${tech.name.replace('.', '')} group relative flex flex-col items-center text-center p-6 md:p-10 rounded-[28px] shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden`}
                  style={{
                    backgroundColor: tech.bgLight,
                    border: `3px solid ${tech.borderLight}`,
                    boxShadow: `inset 0 0 0 1px ${tech.borderLight}33, 0 4px 20px -4px ${tech.color}20`,
                  }}
                >
                  {/* Dark mode background override */}
                  <style>{`
                    .dark .tech-card-${tech.name.replace('.', '')} {
                      background-color: ${tech.bgDark} !important;
                      border-color: ${tech.borderDark} !important;
                      box-shadow: inset 0 0 0 1px ${tech.borderDark}55, 0 4px 30px -4px ${tech.color}30 !important;
                    }
                    .dark .tech-card-${tech.name.replace('.', '')}:hover {
                      box-shadow: inset 0 0 0 1px ${tech.borderDark}88, 0 8px 40px -4px ${tech.color}40 !important;
                    }
                  `}</style>

                  {/* Glow effect on hover */}
                  <div
                    className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 30%, ${tech.color}20, transparent 65%)`,
                    }}
                  />

                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-1/2 group-hover:w-full transition-all duration-500 rounded-b-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${tech.color}, transparent)` }}
                  />

                  {/* Decorative corner accents */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 100% 0%, ${tech.color}, transparent 70%)`,
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-20 h-20 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 0% 100%, ${tech.color}, transparent 70%)`,
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="relative z-10 mb-5 md:mb-6 p-4 md:p-5 rounded-2xl group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundColor: `${tech.color}15` }}
                  >
                    {tech.iconSimple}
                  </div>

                  {/* Name */}
                  <h4
                    style={{ fontFamily: 'Michroma, sans-serif' }}
                    className="relative z-10 text-lg md:text-2xl font-black text-[#521D07] dark:text-[#E2E8F0] uppercase tracking-tight mb-1"
                  >
                    {tech.name}
                  </h4>

                  {/* Category label */}
                  <span
                    className="relative z-10 font-mono text-xs md:text-sm font-bold uppercase tracking-widest"
                    style={{ color: tech.color }}
                  >
                    {tech.desc}
                  </span>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 group-hover:w-3/4 transition-all duration-500 rounded-full"
                    style={{ background: `linear - gradient(90deg, transparent, ${tech.color}, transparent)` }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <br></br> <br></br>
        {/* Featured Projects */}
        <div className="max-w-6xl mx-auto pb-32">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono text-[16px] md:text-[20px] font-bold text-[#A47A2D] dark:text-[#D4AF37] tracking-wider"
            >
              {'// Selected Work'}
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ fontFamily: 'Michroma, sans-serif' }}
              className="text-4xl md:text-[56px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mt-4"
            >
              Featured Projects
            </motion.h3>
          </div>

          <div className="w-full max-w-[1200px] mx-auto px-4 mt-12 mb-16 h-[650px] md:h-[750px] relative">
            <GlassCardDeck
              projects={[
                {
                  title: "DANONO'S BAKERY",
                  description: "As the Backend & Full-Stack Developer, I built a premium e-commerce bakery platform with server-side logic, ordering integration, and a responsive frontend.",
                  image: danonosWebp,
                  live: "https://danonos.com",
                  github: "https://github.com/gabewebd/WSEA.git",
                  tags: ["PHP", "CSS", "JAVASCRIPT", "E-COMMERCE"],
                  role: "Backend & Full-Stack Developer",
                  details: [
                    "As the Backend & Full-Stack Developer for Danono's Bakery, I was responsible for the entire server-side architecture and frontend implementation of this real-world e-commerce platform for a bakery based in Angeles City, Pampanga.",
                    "I developed the backend logic using PHP, handling product catalog management, order processing, and customer data. The server-side code ensures seamless ordering functionality, allowing customers to browse the menu and place orders for their signature 24-hour fermented brioche doughnuts.",
                    "On the frontend, I designed and implemented a vibrant, fully responsive UI using CSS and JavaScript that showcases the bakery's brand identity.",
                    "This project taught me the importance of bridging design with functionality — building a system that not only looks premium but also handles real customer transactions reliably. The site is live and actively serving the business at danonos.com."
                  ]
                },
                {
                  title: "CHANEL WEBSITE REPLICA",
                  description: "As a Frontend Developer in a team of four, I contributed to engineering a pixel-perfect, fully responsive Chanel clone with cross-browser compatibility.",
                  image: chanelWebp,
                  live: "https://prelim-project-thefourwhoadore.netlify.app/home",
                  github: "https://github.com/gabewebd/6AWEB-TheFourWhoAdore.git",
                  tags: ["HTML5", "CSS3", "TYPESCRIPT", "UI/UX"],
                  role: "Frontend Developer",
                  details: [
                    "As a Frontend Developer in a team of four (\"The Four Who Adore\"), I contributed to engineering a pixel-perfect, fully responsive clone of the Chanel luxury fashion website.",
                    "My responsibilities included implementing key UI components such as navigation menus, product display grids, and interactive gallery sections. I focused on achieving visual fidelity to the original Chanel website while ensuring cross-browser compatibility.",
                    "The project was built using HTML5, CSS3, and TypeScript, with a strong emphasis on semantic markup, CSS Grid/Flexbox layouts, and responsive design principles.",
                    "This collaborative project strengthened my frontend development skills and taught me the importance of precision in UI/UX implementation."
                  ]
                },
                {
                  title: "HAU ECO-QUEST",
                  description: "As the Backend & Full-Stack Developer, I architected a gamified sustainability platform with JWT auth and RBAC.",
                  image: ecoQuestWebp,
                  live: "https://hauecoquest.vercel.app",
                  github: "https://github.com/Josh-Aguiluz/6WCSERVER-Final-Project.git",
                  tags: ["REACT", "NODE.JS", "MONGODB", "JWT"],
                  role: "Backend & Full-Stack Developer",
                  details: [
                    "As the Backend & Full-Stack Developer for HAU Eco-Quest, I architected and built this gamified sustainability platform from the ground up using the MERN Stack (MongoDB, Express.js, React, Node.js).",
                    "My primary responsibility was designing and implementing the entire backend infrastructure. This included building secure RESTful API endpoints, integrating JWT-based authentication for user sessions, and implementing Role-Based Access Control (RBAC) to differentiate between admin and regular user permissions.",
                    "I designed the MongoDB data layer with Mongoose schemas to manage user profiles, sustainability challenges, leaderboards, and activity tracking. The backend handles complex game logic including point systems, badge achievements, and progress tracking that gamifies eco-friendly actions on campus.",
                    "On the frontend, I worked with React to build the user-facing interface that connects to the API, displaying real-time leaderboards, challenge progress, and user dashboards. The application is deployed on Vercel and demonstrates my ability to build and deploy production-ready full-stack applications."
                  ]
                }
              ]}
            />
          </div>

          <div className="text-center md:mt-16">
            <button
              onClick={() => { const el = document.getElementById('projects'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              className="group inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#521D07] dark:bg-[#D4AF37] rounded-full font-bold text-sm md:text-base text-white dark:text-[#1A0E05] hover:scale-105 shadow-md transition-all duration-300 dark-btn-primary"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Gradient animation keyframes and manual dark mode styles */}
      <style>{`
@keyframes gradientShift {
  0 %, 100 % { background- position: 0 % center;
}
50 % { background- position: 200 % center; }
        }

        /* 
         * PREMIUM DEEP EARTH-TONE SPLIT BUTTONS
         * Deep, bold colors for maximum contrast and high-end presence.
         */
        .dark .dark-hero-overlay { opacity: 1 !important; }
        .dark .dark-bracket-code { color: #FDF5E7 !important; }
        .dark .dark-hero-title { color: #FDF5E7 !important; }
        .dark .dark-hero-desc { color: #E8DCC8 !important; filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8)) !important; }
        
        .split-btn {
          display: flex;
          align-items: stretch;
          height: 60px;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          min-width: 260px;
          padding: 0;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          border: none;
        }

        /* iPad/Tablet Specific Adjustment - Strictly for 768px - 1024px */
        @media (min-width: 768px) and (max-width: 1024px) {
          .split-btn {
            min-width: 210px;
          }
          .split-btn-text {
            padding-left: 15px;
            font-size: 11px;
          }
          .split-btn-icon-slot {
            width: 50px;
          }
        }

        .split-btn:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        }

        .split-btn-text {
          flex: 1;
          display: flex;
          align-items: center;
          padding-left: 28px;
          padding-right: 12px;
          font-weight: 800;
          color: white;
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: 0.14em;
          z-index: 2;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .split-btn-icon-slot {
          width: 60px;
          background: #FDF5E7; /* Light Linen Slot */
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        /* Fixed curved transition */
        .split-btn-icon-slot::before {
          content: '';
          position: absolute;
          left: -20px;
          top: 0;
          bottom: 0;
          width: 40px;
          background: #FDF5E7;
          border-top-left-radius: 100%;
          border-bottom-left-radius: 100%;
          z-index: 1;
        }

        .split-btn-icon-slot svg {
          position: relative;
          z-index: 10;
          width: 24px;
          height: 24px;
          transition: all 0.3s ease;
        }

        /* Deep, Bold Earth Tones */
        .split-espresso { 
          background: #2D1A0F; /* Deep Dark Espresso */
        }
        .split-espresso .split-btn-icon-slot svg { color: #2D1A0F; }

        .split-gold { 
          background: #7D5A1F; /* Deep Brass/Gold */
        }
        .split-gold .split-btn-icon-slot svg { color: #7D5A1F; }

        .split-mocha { 
          background: #521D07; /* Deep Burnt Mocha */
        }
        .split-mocha .split-btn-icon-slot svg { color: #521D07; }

        .split-btn:hover .split-btn-icon-slot svg {
          transform: scale(1.2);
        }

        /* Dark Mode Consistency */
        .dark .split-btn {
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.6);
        }
        .dark .split-btn-icon-slot,
        .dark .split-btn-icon-slot::before { 
          background: #252220; 
        }
        .dark .split-btn-icon-slot svg {
          color: #A47A2D !important;
        }
        .dark .split-espresso { background: #3D2B1F; border: 1px solid rgba(212, 175, 55, 0.3); }
        .dark .split-gold { background: #8B6E32; border: 1px solid rgba(212, 175, 55, 0.3); }
        .dark .split-mocha { background: #6D2E15; border: 1px solid rgba(212, 175, 55, 0.3); }
      `}</style>
    </section >
  );
}