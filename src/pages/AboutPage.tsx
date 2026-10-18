import React from 'react';
import { Database, Server, Code2, Zap, CheckCircle2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import phpBasicsImg from '../assets/phpBasics.webp';
import comptiaImg from '../assets/comptiaReal.webp';
import ccnaImg from '../assets/ccna.webp';
import awsImg from '../assets/aws.webp';
import phpBasicsPdf from '../assets/phpBasics.pdf';
import comptiaSource from '../assets/comptiaReal.webp';
import ccnaPdf from '../assets/ccna.pdf';
import awsPdf from '../assets/aws.pdf';
import profileImg from '../assets/casualProf.webp';
import CertCoverflow from '../components/CertCoverflow';

export default function AboutPage() {
  const techStack = [
    { name: 'Node.js', category: 'Backend', icon: <Server className="w-12 h-12" /> },
    { name: 'PHP', category: 'Backend', icon: <Code2 className="w-12 h-12" /> },
    { name: 'MySQL', category: 'Database', icon: <Database className="w-12 h-12" /> },
    { name: 'Firebase', category: 'Backend', icon: <Zap className="w-12 h-12" /> },
    { name: 'Flutter', category: 'Mobile', icon: <Code2 className="w-12 h-12" /> },
    { name: 'Angular', category: 'Frontend', icon: <Code2 className="w-12 h-12" /> },
  ];

  const softSkills = ['Adaptability', 'Problem Solving', 'Team Collaboration', 'Fast Learning', 'Communication', 'Critical Thinking'];

  const certifications = [
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-screen py-20 md:py-32 graph-paper-bg relative overflow-hidden bg-[#FDF5E7] dark:bg-[#1A1715]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block px-8 md:px-10 py-3 md:py-4 bg-[#A47A2D] dark:bg-[#A47A2D] rounded-full mb-6 md:mb-8">
            <p className="font-mono text-[16px] md:text-[24px] font-bold text-white dark:text-[#1A1715] uppercase tracking-wider">
              // About Me
            </p>
          </div>
          <h1 style={{ fontFamily: 'Michroma, sans-serif' }} className="text-4xl sm:text-6xl lg:text-7xl leading-tight font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mb-8">
            Who I Am
          </h1>
        </div>

        {/* Bio Section - Split Layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
          {/* Left: Bio Text */}
          <div className="sticker-card bg-white dark:bg-[#252220] p-6 md:p-12 border-4 border-[#A47A2D] dark:border-[#A47A2D]">
            <h3 style={{ fontFamily: 'Michroma, sans-serif' }} className="text-2xl md:text-[48px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mb-6">
              Josh Andrei Aguiluz
            </h3>

            <div className="space-y-6 text-lg md:text-[24px] font-bold text-[#521D07] dark:text-[#B8B0A6]">
              <p>
                BS Information Technology student at <span className="text-[#A47A2D] dark:text-[#A47A2D] font-black">Holy Angel University</span>,
                ranked <span className="text-[#A47A2D] dark:text-[#A47A2D] font-black">Top 1%</span> in the Web Development track.
              </p>

              <p>
                I combine strong backend logic with frontend adaptability to build
                <span className="text-[#A47A2D] dark:text-[#A47A2D] font-black"> efficient, scalable systems</span> that
                solve real-world problems.
              </p>

              <p>
                My <span className="code-snippet">"cheetah-mindset"</span> drives rapid learning and continuous improvement
                in the fast-paced world of software development.
              </p>
            </div>

            <div className="mt-8 p-6 bg-[#F5EBD9] dark:bg-[#1A1715] rounded-[24px] border-3 border-[#A47A2D] dark:border-[#A47A2D]">
              <p className="font-mono text-base md:text-[20px] font-bold text-[#521D07] dark:text-[#E2E8F0] italic">
                "Building efficient, scalable backend systems that solve real-world problems."
              </p>
            </div>
          </div>
          {/* Right: Personal Professional Photo */}
          <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
            <div
              className="sticker-card p-0 border-4 border-[#A47A2D] dark:border-[#A47A2D] relative group -rotate-2 hover:rotate-0 transition-all duration-500 shadow-2xl overflow-hidden"
              style={{
                width: '100%',
                maxWidth: '400px',
              }}
            >
              <img 
                src={profileImg} 
                alt="Josh Andrei Aguiluz - Backend Engineer Profile Photo" 
                className="w-full h-full object-cover block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#521D07]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Repositioned & Improved "Backend Engineer" Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-10 px-10 py-4 bg-[#521D07] text-white rounded-full font-black text-sm md:text-md uppercase tracking-[0.2em] border-2 border-[#A47A2D] shadow-[0_8px_30px_rgba(82,29,7,0.3)] z-20"
              style={{ fontFamily: 'Michroma, sans-serif' }}
            >
              Backend Engineer
            </motion.div>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: 'Michroma, sans-serif' }} className="text-4xl md:text-[72px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mb-4">
              Tech Stack
            </h2>
            <p className="font-mono text-[16px] md:text-[20px] font-bold text-[#521D07] dark:text-[#B8B0A6] tracking-wider">
              // Tools & Technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 15px 30px -10px rgba(82, 29, 7, 0.3)' }}
                className="sticker-card bg-white dark:bg-[#252220] p-8 border-4 border-[#A47A2D] dark:border-[#A47A2D] transition-all relative overflow-hidden group"
              >

                <div className="flex items-center gap-6 relative z-10 block">
                  <div className="icon-placeholder flex-shrink-0">
                    <div className="text-[#521D07] dark:text-[#E2E8F0] opacity-80">
                      {tech.icon}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 style={{ fontFamily: 'Michroma, sans-serif' }} className="text-[24px] md:text-[32px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase truncate">
                      {tech.name}
                    </h4>
                    <p className="font-mono text-[14px] md:text-[16px] font-bold text-[#521D07] dark:text-[#B8B0A6] uppercase truncate">
                      {tech.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: 'Michroma, sans-serif' }} className="text-4xl md:text-[72px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mb-4">
              Soft Skills
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {softSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 15px 30px -10px rgba(82, 29, 7, 0.3)' }}
                className="sticker-card bg-[#F5EBD9] dark:bg-[#252220] p-8 center-content border-4 border-[#A47A2D] dark:border-[#A47A2D] transition-all relative overflow-hidden"
              >
                <div className="w-16 h-16 bg-[#A47A2D] dark:bg-[#A47A2D] rounded-full mb-4 flex items-center justify-center shadow-[4px_4px_0px_rgba(82,29,7,0.2)]">
                  <span className="text-[24px] font-black text-white dark:text-[#1A1715]">✓</span>
                </div>
                <p style={{ fontFamily: 'Michroma, sans-serif' }} className="text-[20px] md:text-[24px] font-black text-[#521D07] dark:text-[#E2E8F0] text-center uppercase">
                  {skill}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 style={{ fontFamily: 'Michroma, sans-serif' }} className="text-4xl md:text-[56px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mb-4 tracking-tight">
              My <span className="text-[#A47A2D] dark:text-[#D4AF37]">Certifications</span>
            </h2>
            <p className="text-[#521D07]/80 dark:text-[#B8B0A6] font-bold text-lg max-w-2xl mx-auto uppercase" style={{ fontFamily: 'Michroma, sans-serif' }}>
              A specialized track record of my technical credentials and academic milestones.
            </p>
          </div>

          <CertCoverflow certifications={certifications} />
        </div>

        {/* Call to Action */}
        <div className="sticker-card bg-[#A47A2D] dark:bg-[#A47A2D] p-8 md:p-12 text-center border-4 border-[#521D07] dark:border-[#E2E8F0]">
          <h3 style={{ fontFamily: 'Michroma, sans-serif' }} className="text-[32px] md:text-[48px] font-black text-white dark:text-[#1A1715] uppercase mb-6">
            Let's Work Together
          </h3>
          <p className="text-lg md:text-[24px] font-bold text-white dark:text-[#1A1715] mb-8 max-w-2xl mx-auto">
            I'm actively seeking internship opportunities where I can contribute to
            impactful projects and grow as a developer.
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="pill-button px-8 md:px-12 py-4 md:py-6 bg-[#521D07] dark:bg-[#521D07] text-white dark:text-white text-lg md:text-[24px] inline-block hover:bg-[#FFA51F] dark:hover:bg-[#FFA51F] transition-colors"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section >
  );
}