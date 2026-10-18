import React from 'react';
import { Award, Briefcase, GraduationCap, Download, Terminal, Globe, Cpu, MapPin, CheckCircle2, Mail, Layers, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import acsciWebp from '../assets/ACSCI.webp';
import holyAngelWebp from '../assets/holyAngel.webp';
import javascriptWebp from '../assets/javascript.webp';
import phpResumeWebp from '../assets/phpResume.webp';
import ccnaResumeWebp from '../assets/ccnaReallll.webp';
import comptiaResumeWebp from '../assets/comptiaResume.webp';
import hubspotResumeWebp from '../assets/hubspotResume.webp';
import resumePdf from '../assets/resume.pdf';

/* ================================================================
   SVG Donut Pie Chart — Labels OUTSIDE with leader lines
   ================================================================ */
function SkillsPieChart() {
  const size = 320;
  const strokeWidth = 60;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;

  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    // Detect dark mode from document class
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme(); // Initial check

    // Observe class changes on <html> to catch theme toggles
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const segments = [
    { label: 'Backend', pct: 50, color: '#A47A2D', darkColor: '#D4AF37', items: ['Node.js', 'PHP', 'MySQL', 'Firebase', 'Express'] },
    { label: 'DevTools', pct: 30, color: '#D4AF37', darkColor: '#E8C94B', items: ['Git/GitHub', 'VS Code', 'Postman', 'Figma'] },
    { label: 'Frontend', pct: 20, color: '#8B4513', darkColor: '#E27D60', items: ['React', 'Angular', 'Flutter', 'HTML5/CSS3', 'Tailwind'] },
  ];

  let offsetAngle = -Math.PI / 2;
  let accumulatedDash = 0;

  const segmentData = segments.map((seg) => {
    const dash = (seg.pct / 100) * circumference;
    const gap = circumference - dash;
    const startAngle = offsetAngle;
    const segAngle = (seg.pct / 100) * 2 * Math.PI;
    const endAngle = startAngle + segAngle;
    const midAngle = (startAngle + endAngle) / 2;

    // Use positive offset for Safari compatibility
    // In SVG, positive stroke-dashoffset moves the pattern towards the start of the path (counter-clockwise)
    // To move the start point "forward" (clockwise) by 'accumulatedDash', we offset by (circumference - accumulatedDash)
    const currentOffset = accumulatedDash === 0 ? 0 : circumference - (accumulatedDash % circumference);

    accumulatedDash += dash;
    offsetAngle = endAngle;
    return { ...seg, dash, gap, currentOffset, midAngle };
  });

  // SVG canvas size
  const svgSize = 680;
  const svgCx = svgSize / 2;
  const svgCy = svgSize / 2;
  const outerLabelRadius = radius + strokeWidth / 2 + 55;
  const lineStartRadius = radius + strokeWidth / 2 + 5;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
      {/* Pie Chart with external labels — scales on mobile */}
      <div className="relative flex-shrink-0 flex items-center justify-center w-full lg:w-auto" style={{ maxWidth: 500 }}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          style={{ overflow: 'visible' }}
        >
          {/* Donut segments */}
          <g transform={`rotate(-90 ${svgCx} ${svgCy})`}>
            {segmentData.map((seg, i) => (
              <motion.circle
                key={i}
                cx={svgCx}
                cy={svgCy}
                r={radius}
                fill="none"
                stroke={isDark ? seg.darkColor : seg.color}
                strokeWidth={strokeWidth}
                strokeDashoffset={seg.currentOffset}
                strokeLinecap="butt"
                initial={{ strokeDasharray: `0 ${circumference}`, opacity: 0 }}
                whileInView={{ strokeDasharray: `${seg.dash} ${seg.gap}`, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.4 + i * 0.25,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            ))}
          </g>

          {/* Leader lines + external labels */}
          {segmentData.map((seg, i) => {
            const lineX1 = svgCx + lineStartRadius * Math.cos(seg.midAngle);
            const lineY1 = svgCy + lineStartRadius * Math.sin(seg.midAngle);
            const labelX = svgCx + outerLabelRadius * Math.cos(seg.midAngle);
            const labelY = svgCy + outerLabelRadius * Math.sin(seg.midAngle);
            const isRight = Math.cos(seg.midAngle) >= 0;

            return (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
              >
                {/* Leader line */}
                <line
                  x1={lineX1} y1={lineY1}
                  x2={labelX} y2={labelY}
                  stroke={isDark ? seg.darkColor : seg.color}
                  strokeWidth={2}
                  strokeDasharray="4 3"
                  opacity={0.6}
                />
                {/* Dot at ring edge */}
                <circle cx={lineX1} cy={lineY1} r={4} fill={isDark ? seg.darkColor : seg.color} />
                {/* Label text */}
                <text
                  x={labelX}
                  y={labelY - 6}
                  textAnchor={isRight ? 'start' : 'end'}
                  dominantBaseline="middle"
                  fill={isDark ? seg.darkColor : seg.color}
                  fontWeight={900}
                  fontSize={16}
                  fontFamily="Michroma, sans-serif"
                  letterSpacing="0.05em"
                >
                  {seg.label.toUpperCase()}
                </text>
                <text
                  x={labelX}
                  y={labelY + 14}
                  textAnchor={isRight ? 'start' : 'end'}
                  dominantBaseline="middle"
                  fill={isDark ? seg.darkColor : seg.color}
                  fontWeight={700}
                  fontSize={22}
                  fontFamily="Michroma, sans-serif"
                >
                  {seg.pct}%
                </text>
              </motion.g>
            );
          })}

          {/* Center circle */}
          <foreignObject
            x={svgCx - (radius - strokeWidth / 2 - 2)}
            y={svgCy - (radius - strokeWidth / 2 - 2)}
            width={(radius - strokeWidth / 2 - 2) * 2}
            height={(radius - strokeWidth / 2 - 2) * 2}
          >
            <div
              style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              className="bg-[#FDF5E7] dark:bg-[#1A1715] flex flex-col items-center justify-center border-4 border-[#A47A2D]/10"
            >
              <span style={{ fontFamily: 'Michroma, sans-serif' }} className="text-4xl font-black text-[#521D07] dark:text-[#E2E8F0]">100%</span>
              <span style={{ fontFamily: 'Michroma, sans-serif', letterSpacing: '0.2em' }} className="text-xs font-bold text-[#A47A2D]">SKILLS</span>
            </div>
          </foreignObject>
        </svg>
      </div>

      {/* Legend + Tech Items */}
      <div className="flex-1 grid gap-8">
        {segments.map((seg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 rounded-full flex-shrink-0 shadow-md" style={{ backgroundColor: isDark ? seg.darkColor : seg.color }} />
              <span style={{ fontFamily: 'Michroma, sans-serif' }} className="font-black text-[#521D07] dark:text-[#E2E8F0] uppercase text-lg tracking-wide">
                {seg.label}
              </span>
              <span className="text-[#A47A2D] font-black text-lg">— {seg.pct}%</span>
            </div>
            <div className="flex flex-wrap gap-2 ml-8">
              {seg.items.map((item, j) => (
                <motion.span
                  key={j}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-4 py-2 text-sm font-bold rounded-xl border-2 cursor-default transition-colors"
                  style={{
                    borderColor: isDark ? seg.darkColor : seg.color,
                    color: isDark ? seg.darkColor : seg.color,
                    backgroundColor: isDark ? `${seg.darkColor}12` : `${seg.color}12`,
                  }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
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
    <div className="w-full min-h-screen pt-32 pb-24 px-4 md:px-6 lg:px-12 bg-[#FDF5E7] dark:bg-[#1A1715] overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ===== Page Title & Download ===== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-block px-5 py-2 bg-[#A47A2D]/10 rounded-full mb-4 border border-[#A47A2D]/20"
            >
              <p className="font-mono text-sm font-bold text-[#A47A2D] uppercase tracking-wider">
                {'// Professional Profile'}
              </p>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ fontFamily: 'Michroma, sans-serif' }}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-[#521D07] dark:text-[#E2E8F0] uppercase"
            >
              Resume
            </motion.h1>
          </div>

          <a href={resumePdf} download="Josh_Aguiluz_Resume.pdf">
            <MagneticButton className="px-6 py-3 md:px-8 md:py-4 bg-[#A47A2D] hover:bg-[#FFA51F] text-white rounded-[20px] font-black text-base md:text-lg flex items-center gap-3 shadow-[8px_8px_0px_#521D07] dark:shadow-[8px_8px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#521D07] transition-all border-2 border-[#521D07] dark:border-[#E2E8F0]">
              <Download className="w-5 h-5" />
              Download PDF
            </MagneticButton>
          </a>
        </div>

        {/* ===== SECTION 1: Unified Profile & Summary Container ===== */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,235,217,0.5) 100%)',
              borderRadius: '32px',
              border: '1px solid rgba(164,122,45,0.15)',
              padding: '0',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(82,29,7,0.06), 0 2px 8px rgba(82,29,7,0.04)',
            }}
            className="resume-profile-card"
          >
            {/* Inline responsive overrides */}
            <style>{`
              .dark .resume-profile-card {
                background: linear-gradient(135deg, rgba(37,34,32,0.95) 0%, rgba(26,23,21,0.8) 100%) !important;
                border-color: rgba(164,122,45,0.2) !important;
                box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15) !important;
              }
              .resume-s1-divider { display: none; }
              @media (min-width: 1024px) {
                .resume-s1-divider {
                  display: block;
                  position: absolute;
                  left: 42%;
                  top: 48px;
                  bottom: 48px;
                  width: 1px;
                  background: linear-gradient(to bottom, transparent, rgba(164,122,45,0.2), transparent);
                }
              }

              /* RESPONSIVE SUMMARY OVERRIDES */
              .summary-stats-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 12px;
              }
              .summary-card-inner {
                padding: 24px 16px;
              }

              @media (min-width: 480px) {
                .summary-stats-grid {
                  grid-template-columns: repeat(2, 1fr);
                  gap: 16px;
                }
                .summary-card-inner {
                  padding: 40px 32px;
                }
              }
            `}</style>

            <div className="relative summary-card-inner">
              {/* Subtle decorative circle */}
              <div style={{
                position: 'absolute', right: '-80px', bottom: '-80px',
                width: '280px', height: '280px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(164,122,45,0.04) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', position: 'relative', zIndex: 1 }} className="lg:grid-cols-12">

                {/* Professional Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="lg:col-span-12 flex flex-col justify-center"
                >
                  {/* Section Label */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      background: 'linear-gradient(135deg, #A47A2D, #D4AF37)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(164,122,45,0.2)',
                    }}>
                      <Briefcase style={{ width: '20px', height: '20px', color: 'white' }} />
                    </div>
                    <span style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '13px',
                      fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                    }} className="text-[#A47A2D]">
                      Professional Summary
                    </span>
                  </motion.div>

                  {/* Summary Text */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: 1.75, fontWeight: 500,
                    }}
                    className="text-[#521D07]/90 dark:text-[#B8B0A6] mb-10 text-center lg:text-left text-[15px] sm:text-[17px]"
                  >
                    Motivated <span style={{ fontWeight: 800 }} className="text-[#A47A2D]">BS Information Technology</span> student and{' '}
                    <span style={{ fontWeight: 800 }} className="text-[#A47A2D]">Top 1% Scholar</span> seeking a Backend Developer internship.
                    I leverage Full-Stack capabilities in{' '}
                    <span style={{
                      fontFamily: 'Inter, sans-serif', fontWeight: 700,
                      padding: '2px 8px', borderRadius: '6px', fontSize: '15px',
                    }} className="bg-[#A47A2D]/10 text-[#A47A2D]">Node.js</span>,{' '}
                    <span style={{
                      fontFamily: 'Inter, sans-serif', fontWeight: 700,
                      padding: '2px 8px', borderRadius: '6px', fontSize: '15px',
                    }} className="bg-[#A47A2D]/10 text-[#A47A2D]">Angular</span>, and{' '}
                    <span style={{
                      fontFamily: 'Inter, sans-serif', fontWeight: 700,
                      padding: '2px 8px', borderRadius: '6px', fontSize: '15px',
                    }} className="bg-[#A47A2D]/10 text-[#A47A2D]">Flutter</span>{' '}
                    to build efficient, scalable systems while driving rapid technical growth.
                  </motion.p>

                  {/* Quick Stats Grid — Responsive Columns */}
                  <div className="summary-stats-grid">
                    {quickStats.map((stat, i) => {
                      const IconComp = stat.icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{ y: -4 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '14px',
                            padding: '16px 18px',
                            borderRadius: '16px',
                            border: '1px solid rgba(164,122,45,0.12)',
                            transition: 'all 0.3s ease',
                            cursor: 'default',
                          }}
                          className="bg-[#F5EBD9]/50 dark:bg-[#1A1715]/60 hover:shadow-lg"
                        >
                          <div style={{
                            width: '44px', height: '44px', borderRadius: '12px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'linear-gradient(135deg, rgba(164,122,45,0.1), rgba(212,175,55,0.08))',
                            flexShrink: 0,
                          }}>
                            <IconComp style={{ width: '20px', height: '20px', color: '#A47A2D' }} />
                          </div>
                          <div>
                            <div style={{
                              fontFamily: 'Inter, sans-serif', fontSize: '24px', fontWeight: 800,
                              lineHeight: 1.1,
                            }} className="text-[#A47A2D]">
                              {stat.value}
                            </div>
                            <div style={{
                              fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600,
                              letterSpacing: '0.06em', textTransform: 'uppercase',
                              marginTop: '2px',
                            }} className="text-[#521D07] dark:text-[#E2E8F0]">
                              {stat.label}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </section>
        <br></br> <br></br> <br></br>
        {/* ===== SECTION 2: Technical Skills — Large Pie Chart ===== */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-14 h-14 bg-[#A47A2D] rounded-2xl flex items-center justify-center border-2 border-[#521D07] shadow-[4px_4px_0px_#521D07]">
                <Terminal className="text-white w-7 h-7" />
              </div>
              <h2 style={{ fontFamily: 'Michroma, sans-serif' }} className="text-2xl md:text-4xl lg:text-5xl font-black text-[#521D07] dark:text-[#E2E8F0] uppercase">
                Technical <span className="text-[#A47A2D]">Skills</span>
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-[#252220] rounded-[24px] md:rounded-[32px] border-4 border-[#A47A2D] p-4 md:p-8 lg:p-14"
          >
            <SkillsPieChart />
          </motion.div>
        </section>
        <br></br> <br></br> <br></br>
        {/* ===== SECTION 3: Professional Journey — Zigzag Timeline with Images ===== */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-14 h-14 bg-[#A47A2D] rounded-2xl flex items-center justify-center border-2 border-[#521D07] shadow-[4px_4px_0px_#521D07]">
                <GraduationCap className="text-white w-7 h-7" />
              </div>
              <h2 style={{ fontFamily: 'Michroma, sans-serif' }} className="text-2xl md:text-4xl lg:text-5xl font-black text-[#521D07] dark:text-[#E2E8F0] uppercase">
                Professional <span className="text-[#A47A2D]">Journey</span>
              </h2>
            </div>
          </motion.div>

          {/* Custom responsive styles for timeline since Tailwind responsive classes not in build */}
          <style>{`
            .tl-mobile { display: block; }
            .tl-desktop { display: none; }
            .tl-line { position: absolute; top: 0; bottom: 0; left: 16px; transform: none; }
            .tl-entries { display: flex; flex-direction: column; gap: 40px; position: relative; z-index: 1; }
            
            /* NUCLEAR OVERRIDES FOR TIMELINE HEADERS */
            #tl-nuke-wrapper .tl-card-title {
              font-family: 'Michroma', sans-serif !important;
              font-size: 14px !important;
              font-weight: 900 !important;
              line-height: 1.4 !important;
              letter-spacing: -0.01em !important;
              word-break: keep-all !important;
              overflow-wrap: break-word !important;
              text-transform: uppercase !important;
              margin-bottom: 8px !important;
              display: block !important;
            }

            @media (min-width: 768px) {
              .tl-mobile { display: none !important; }
              .tl-desktop { display: grid !important; }
              .tl-line { left: 50% !important; transform: translateX(-50%) !important; }
              .tl-entries { gap: 60px !important; }
              #tl-nuke-wrapper .tl-card-title {
                font-size: 15px !important;
              }
            }
          `}</style>

          {/* Timeline — responsive: stacked on mobile, zigzag on md+ */}
          <div id="tl-nuke-wrapper" className="relative max-w-5xl mx-auto">

            {/* Center vertical line */}
            <div
              className="tl-line"
              style={{
                width: '4px',
                background: 'linear-gradient(to bottom, #A47A2D, #D4AF37, #A47A2D)',
                borderRadius: '4px',
                zIndex: 0,
              }}
            />

            <div className="tl-entries">
              {timeline.map((item, idx) => {
                const imageOnLeft = idx % 2 === 0;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    {/* === MOBILE layout (< md): stacked card with image on top === */}
                    <div className="tl-mobile pl-10 relative">
                      {/* Dot on the left line */}
                      <div className="absolute left-2 top-6 z-10"
                        style={{
                          width: '16px', height: '16px', borderRadius: '50%',
                          backgroundColor: '#D4AF37',
                          border: '3px solid #FDF5E7',
                          boxShadow: '0 0 0 3px #A47A2D',
                        }}
                      />
                      <div className="bg-white dark:bg-[#252220] rounded-2xl border-4 border-[#A47A2D] overflow-hidden shadow-lg">
                        <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                        <div className="p-4 md:p-5">
                          <span className="inline-block px-3 py-1 bg-[#A47A2D] rounded-lg font-mono text-[10px] font-black text-white uppercase tracking-wider mb-2">{item.year}</span>
                          <div className="tl-card-title font-black text-[#521D07] dark:text-[#E2E8F0]">
                            {item.title}
                          </div>
                          <p className="text-[#A47A2D] font-bold text-xs mb-2">{item.org}</p>
                          <p className="text-xs font-medium text-[#521D07]/80 dark:text-[#B8B0A6] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>

                    {/* === DESKTOP layout (md+): zigzag grid === */}
                    <div className="tl-desktop" style={{ gridTemplateColumns: 'minmax(0, 1fr) 60px minmax(0, 1fr)', alignItems: 'center' }}>
                      {/* LEFT COLUMN */}
                      <div style={{ gridColumn: '1 / 2' }}>
                        {imageOnLeft ? (
                          <motion.div
                            whileHover={{ scale: 1.04, rotate: -2 }}
                            transition={{ duration: 0.3 }}
                            style={{ borderRadius: '24px', overflow: 'hidden', border: '4px solid #A47A2D', width: '100%' }}
                            className="shadow-xl"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                              className="hover:scale-110 transition-transform duration-700"
                            />
                          </motion.div>
                        ) : (
                          <div
                            className="bg-white dark:bg-[#252220] shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
                            style={{ borderRadius: '24px', border: '4px solid #A47A2D', padding: '20px 24px', position: 'relative', overflow: 'hidden', textAlign: 'left' }}
                          >
                            <span style={{ display: 'inline-block', padding: '4px 14px', backgroundColor: '#A47A2D', borderRadius: '10px', marginBottom: '12px' }}>
                              <span className="font-mono text-xs font-black text-white uppercase tracking-wider">{item.year}</span>
                            </span>
                            <div className="tl-card-title font-black text-[#521D07] dark:text-[#E2E8F0]">
                              {item.title}
                            </div>
                            <p style={{ fontSize: '14px', marginBottom: '10px' }} className="text-[#A47A2D] font-bold">{item.org}</p>
                            <p style={{ fontSize: '14px', lineHeight: 1.6 }} className="font-medium text-[#521D07]/80 dark:text-[#B8B0A6]">{item.desc}</p>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A47A2D] to-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                          </div>
                        )}
                      </div>

                      {/* CENTER DOT */}
                      <div style={{ gridColumn: '2 / 3', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.3, type: 'spring' }}
                          style={{
                            width: '20px', height: '20px', borderRadius: '50%',
                            backgroundColor: '#D4AF37',
                            border: '4px solid #FDF5E7',
                            boxShadow: '0 0 0 4px #A47A2D, 0 0 20px rgba(164,122,45,0.5)',
                          }}
                          className="dark:border-[#1A1715]"
                        />
                      </div>

                      {/* RIGHT COLUMN */}
                      <div style={{ gridColumn: '3 / 4' }}>
                        {imageOnLeft ? (
                          <div
                            className="bg-white dark:bg-[#252220] shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
                            style={{ borderRadius: '24px', border: '4px solid #A47A2D', padding: '20px 24px', position: 'relative', overflow: 'hidden', textAlign: 'left' }}
                          >
                            <span style={{ display: 'inline-block', padding: '4px 14px', backgroundColor: '#A47A2D', borderRadius: '10px', marginBottom: '12px' }}>
                              <span className="font-mono text-xs font-black text-white uppercase tracking-wider">{item.year}</span>
                            </span>
                            <div className="tl-card-title font-black text-[#521D07] dark:text-[#E2E8F0]">
                              {item.title}
                            </div>
                            <p style={{ fontSize: '14px', marginBottom: '10px' }} className="text-[#A47A2D] font-bold">{item.org}</p>
                            <p style={{ fontSize: '14px', lineHeight: 1.6 }} className="font-medium text-[#521D07]/80 dark:text-[#B8B0A6]">{item.desc}</p>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A47A2D] to-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                          </div>
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.04, rotate: 2 }}
                            transition={{ duration: 0.3 }}
                            style={{ borderRadius: '24px', overflow: 'hidden', border: '4px solid #A47A2D', width: '100%' }}
                            className="shadow-xl"
                          >
                            <img
                              src={item.image}
                              alt={`Certificate photo for ${item.title} - ${item.org}`}
                              style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                              className="hover:scale-110 transition-transform duration-700"
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* End dot */}
            <div className="flex justify-center mt-8 relative z-[1]">
              <div style={{
                width: '16px', height: '16px', borderRadius: '50%',
                backgroundColor: '#A47A2D',
                boxShadow: '0 0 0 4px #D4AF37, 0 0 20px rgba(164,122,45,0.3)',
              }} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}