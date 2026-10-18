import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from './assets/logo.webp';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ResumePage from './pages/ResumePage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import ThemeToggle from './components/ThemeToggle';
import CustomCursor from './components/CustomCursor';
import MagneticButton from './components/MagneticButton';
import ScrollVelocityText from './components/ScrollVelocityText';
import Scene3D from './components/Scene3D';
import ScrollProgress from './components/ScrollProgress';
import Footer from './components/Footer';

// Memoize page sections to prevent re-renders on every scroll tick
const MemoizedHomePage = React.memo(HomePage);
const MemoizedAboutPage = React.memo(AboutPage);
const MemoizedProjectsPage = React.memo(ProjectsPage);
const MemoizedResumePage = React.memo(ResumePage);
const MemoizedBlogPage = React.memo(BlogPage);
const MemoizedContactPage = React.memo(ContactPage);
const MemoizedFooter = React.memo(Footer);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollYValue, setScrollYValue] = useState(0);
  const [scrollYProgressValue, setScrollYProgressValue] = useState(0);

  useEffect(() => {
    // Smooth scroll setup
    document.documentElement.style.scrollBehavior = 'smooth';

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollYValue(scrollY);
      setScrolled(scrollY > 50);

      // Calculate scroll progress
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setScrollYProgressValue(progress);

      // Detect active section based on scroll position
      const sections = ['home', 'about', 'projects', 'resume', 'blog', 'contact'];
      const scrollPosition = scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Sync activeSection to URL Hash (SEO Requirement: Meaningful URLs)
  useEffect(() => {
    if (activeSection === 'home') {
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      window.history.replaceState(null, '', `#${activeSection}`);
    }
  }, [activeSection]);

  // Sync section to Browser Title (SEO Requirement)
  useEffect(() => {
    const formattedSection = activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
    const baseTitle = "Josh Andrei Aguiluz | Backend Engineer";
    
    if (activeSection === 'home') {
      document.title = baseTitle;
    } else {
      document.title = `${formattedSection} | ${baseTitle}`;
    }
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
      // Update hash immediately on click
      window.history.pushState(null, '', sectionId === 'home' ? window.location.pathname : `#${sectionId}`);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Resume', id: 'resume' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <div className="relative overflow-x-hidden w-full bg-[#FDF5E7] dark:bg-[#1A1715]">
      {/* 3D Bouncing Sphere */}
      <Scene3D />

      {/* Fixed Navigation - ALWAYS ON TOP */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#FDF5E7]/95 dark:bg-[#1A1715]/95 backdrop-blur-sm shadow-lg border-b-4 border-[#A47A2D] py-4'
          : 'bg-[#FDF5E7]/80 dark:bg-[#1A1715]/80 backdrop-blur-sm border-b-4 border-[#A47A2D] py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo with Magnetic Effect */}
            <MagneticButton
              onClick={() => scrollToSection('home')}
              className="flex items-center transition-transform hover:scale-105 bg-transparent border-none"
            >
              <img
                src={logo}
                alt="Josh Aguiluz Logo"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </MagneticButton>

            {/* Desktop Navigation with Magnetic Buttons */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              {navLinks.map((link) => (
                <MagneticButton
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  style={{ fontFamily: 'Michroma, sans-serif' }}
                  className={`nav-link-item px-4 lg:px-6 py-2 text-[16px] font-black uppercase transition-all rounded-full border-none ${activeSection === link.id
                    ? 'bg-[#A47A2D] dark:bg-[#A47A2D] text-white dark:text-[#1A1715]'
                    : 'bg-transparent text-[#521D07] dark:text-[#E2E8F0] hover:bg-[#A47A2D]/20 hover:text-[#FFA51F]'
                    }`}
                >
                  {link.name}
                </MagneticButton>
              ))}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
              /* STRICT TABLET FIX: 768px to 1024px ONLY */
              @media (min-width: 768px) and (max-width: 1024px) {
                .nav-link-item {
                  padding-left: 10px !important;
                  padding-right: 10px !important;
                  font-size: 11px !important;
                }
                .md\\:flex.gap-4 {
                  gap: 8px !important;
                }
              }
            `}} />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-[16px] bg-[#A47A2D] dark:bg-[#A47A2D] text-white dark:text-[#1A1715] z-50"
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* STANDARD VERTICAL LAYOUT - SMOOTH SCROLLING */}

      {/* 1. HERO SECTION */}
      <section
        id="home"
        className="relative w-full min-h-screen py-20 bg-transparent"
      >
        <MemoizedHomePage />
      </section>

      {/* 2. ABOUT SECTION */}
      <section
        id="about"
        className="relative w-full min-h-screen py-20 bg-transparent"
      >
        <MemoizedAboutPage />
      </section>

      {/* SCROLL VELOCITY PARALLAX STRIP */}
      <ScrollVelocityText text="BACKEND • FRONTEND • SCALABLE • SECURE" baseVelocity={1} />

      {/* 3. PROJECTS SECTION */}
      <section
        id="projects"
        className="relative w-full min-h-screen py-20 bg-transparent"
      >
        <MemoizedProjectsPage />
      </section>

      {/* 4. RESUME SECTION */}
      <section
        id="resume"
        className="relative w-full min-h-screen bg-transparent"
      >
        <MemoizedResumePage />
      </section>

      {/* 5. BLOG SECTION */}
      <section
        id="blog"
        className="relative w-full min-h-screen py-20 bg-transparent"
      >
        <MemoizedBlogPage />
      </section>

      {/* 6. CONTACT SECTION */}
      <section
        id="contact"
        className="relative w-full min-h-screen py-20 bg-transparent"
      >
        <MemoizedContactPage />
      </section>

      <MemoizedFooter />

      {/* Redesigned Premium Mobile Menu Overlay - Moved to bottom for max visibility */}
      <motion.div
        initial="closed"
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: {
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 20
            }
          },
          closed: {
            x: "100%",
            opacity: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.1
            }
          }
        }}
        className="fixed inset-0 z-[9999] md:hidden bg-[#FDF5E7] dark:bg-[#1A1715] flex flex-col items-center"
      >
        {/* Mobile Menu Close Button - High visibility */}
        <div className="w-full flex justify-end p-8">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-4 rounded-full bg-[#A47A2D] text-white dark:text-[#1A1715] shadow-2xl"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Menu Links Area */}
        <div className="flex-1 w-full flex flex-col justify-center items-center px-6">
          <div className="space-y-4 w-full max-w-[320px]">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.id}
                variants={{
                  open: { 
                    x: 0, 
                    opacity: 1, 
                    transition: { delay: 0.4 + index * 0.1 } 
                  },
                  closed: { x: 50, opacity: 0 }
                }}
                onClick={() => scrollToSection(link.id)}
                className={`group relative w-full py-4 px-2 rounded-2xl transition-all ${activeSection === link.id
                  ? 'text-[#A47A2D]'
                  : 'text-[#521D07] dark:text-white'
                  }`}
              >
                <div 
                  className="relative z-10 text-[28px] sm:text-[36px] font-black uppercase tracking-tighter text-center"
                  style={{ fontFamily: 'Michroma, sans-serif' }}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.div 
                      layoutId="mobileNavUnderline"
                      className="h-1 bg-[#A47A2D] mt-2 mx-auto w-16 rounded-full" 
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

      </motion.div>

      {/* Global Scroll Progress Bar */}
      <ScrollProgress />

      {/* Custom Cursor - Rendered last so it sits on top of everything including modals */}
      <CustomCursor />
    </div>
  );
}