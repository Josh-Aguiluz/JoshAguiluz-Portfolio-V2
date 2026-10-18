import React, { useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Home, User, Briefcase, BookOpen, Send, ArrowUp } from 'lucide-react';
import logoImg from '../assets/logo.webp';

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const DARK_BG = '#521D07';
    const LIGHT_TEXT = '#FDF5E7';
    const GOLD = '#A47A2D';

    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);

    const onMove = (e: React.MouseEvent<HTMLElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
    };

    return (
        <>
            {/* Footer-specific styles — matches danonos.com CSS exactly */}
            <style>{`
        .pf-footer {
          background: linear-gradient(to right, #521D07, #5a2e22);
          color: white;
          padding: 80px 8% 30px;
          position: relative;
          overflow: hidden;
          font-family: 'Michroma', sans-serif !important;
        }
        
        /* STRICT OVERRIDES AGAINST MAIN.CSS MOBILE CLAMPS */
        #pf-footer-nuke p, 
        #pf-footer-nuke a, 
        #pf-footer-nuke li,
        #pf-footer-nuke span,
        #pf-footer-nuke h3 {
          font-family: 'Michroma', sans-serif !important;
          font-size: 13px !important;
          line-height: 1.5 !important;
        }
        .pf-footer-content {
          max-width: 95%;
          margin: 0 auto 50px;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 80px;
        }
        .pf-footer-section h3 {
          color: #A47A2D;
          font-size: 11px !important;
          font-family: 'Michroma', sans-serif;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0 0 25px 0;
          font-weight: 700;
        }
        .pf-footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .pf-footer-section li {
          margin-bottom: 12px;
        }
        .pf-footer-section a {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          transition: 0.3s;
          font-size: 13px !important;
          font-family: 'Michroma', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .pf-quick-links a {
          font-size: 13px !important;
        }
        .pf-footer-section a:hover {
          color: #A47A2D;
          padding-left: 5px;
        }
        .pf-social-icons {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }
        .pf-social-icon {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          transition: 0.3s;
        }
        .pf-social-icon:hover {
          background: #A47A2D;
          transform: translateY(-3px);
        }
        .pf-footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 30px;
          text-align: center;
          font-size: 12px !important;
          font-family: 'Michroma', sans-serif;
          opacity: 0.7;
        }
        .pf-footer-about p {
          color: rgba(255,255,255,0.8);
          font-size: 13px !important;
          font-family: 'Michroma', sans-serif;
          line-height: 1.7;
          margin: 0 0 0 0;
        }
        @media (max-width: 768px) {
          .pf-footer { padding: 50px 24px 24px; }
          .pf-footer-content { grid-template-columns: 1fr !important; gap: 32px !important; text-align: center; }
          .pf-social-icons { justify-content: center; }
          .pf-footer-section a { justify-content: center; }
        }
      `}</style>

            <footer
                id="pf-footer-nuke"
                className="pf-footer"
                onMouseMove={onMove}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                {/* Spotlight */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        opacity: hovering ? 1 : 0,
                        transition: 'opacity 0.3s',
                        background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(164,122,45,0.15), transparent 40%)`,
                    }}
                />
                {/* Cursor glow */}
                <div
                    className="pointer-events-none absolute rounded-full"
                    style={{
                        width: 32, height: 32,
                        left: mouse.x, top: mouse.y,
                        transform: 'translate(-50%, -50%)',
                        opacity: hovering ? 0.5 : 0,
                        transition: 'opacity 0.1s',
                        background: LIGHT_TEXT,
                        mixBlendMode: 'difference',
                        filter: 'blur(4px)',
                        zIndex: 50,
                    }}
                />

                {/* Main grid */}
                <div className="pf-footer-content" style={{ position: 'relative', zIndex: 20 }}>

                    {/* Col 1 — About */}
                    <div className="pf-footer-section pf-footer-about">
                        <a href="#home">
                            <img
                                src={logoImg}
                                alt="Josh Aguiluz"
                                style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%', marginBottom: 15 }}
                            />
                        </a>
                        <p className="!text-[13px] !font-['Michroma'] !leading-relaxed !m-0">
                            Backend-focused Full-Stack Engineer | Scalable Systems
                        </p>
                        <div className="pf-social-icons">
                            <a href="https://github.com/Josh-Aguiluz" className="pf-social-icon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Github size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/josh-aguiluz-0a150a350/" className="pf-social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=josh.dizon.aguiluz25@gmail.com" className="pf-social-icon" target="_blank" rel="noopener noreferrer" aria-label="Email">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Col 2 — Quick Links */}
                    <div className="pf-footer-section">
                        <h3 className="!font-['Michroma'] !uppercase !tracking-widest !font-bold !mb-6">Quick Links</h3>
                        <ul className="pf-quick-links">
                            <li><a href="#home" className="!font-['Michroma'] !text-[13px]"><Home size={14} /> Home</a></li>
                            <li><a href="#about" className="!font-['Michroma'] !text-[13px]"><User size={14} /> About</a></li>
                            <li><a href="#projects" className="!font-['Michroma'] !text-[13px]"><Briefcase size={14} /> Projects</a></li>
                            <li><a href="#resume" className="!font-['Michroma'] !text-[13px]"><BookOpen size={14} /> Resume</a></li>
                            <li><a href="#contact" className="!font-['Michroma'] !text-[13px]"><Send size={14} /> Contact</a></li>
                        </ul>
                    </div>

                    {/* Col 3 — Contact */}
                    <div className="pf-footer-section">
                        <h3 className="!font-['Michroma'] !uppercase !tracking-widest !font-bold !mb-6">Contact Me</h3>
                        <ul>
                            <li>
                                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=josh.dizon.aguiluz25@gmail.com" target="_blank" rel="noopener noreferrer" className="!font-['Michroma'] !text-[13px]">
                                    <Mail size={14} /> josh.dizon.aguiluz25@gmail.com
                                </a>
                            </li>
                            <li>
                                <a href="https://www.google.com/maps/search/?api=1&query=Magalang%2C+Pampanga" target="_blank" rel="noopener noreferrer" className="!font-['Michroma'] !text-[13px]">
                                    <MapPin size={14} /> Magalang, Pampanga
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pf-footer-bottom" style={{ position: 'relative', zIndex: 20 }}>
                    <p className="!font-['Michroma'] !text-[12px] !m-0 !opacity-70">
                        © 2026 Josh Andrei Aguiluz. All rights reserved. Built with React & TypeScript.
                    </p>
                </div>

                {/* Back to top */}
                <button
                    onClick={scrollToTop}
                    aria-label="Back to Top"
                    className="fixed bottom-[90px] right-4 md:bottom-[130px] md:right-6 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center cursor-pointer z-[999] shadow-lg transition-transform hover:scale-110"
                    style={{
                        backgroundColor: GOLD, color: LIGHT_TEXT,
                        border: `2px solid ${LIGHT_TEXT}`,
                    }}
                >
                    <ArrowUp size={20} className="md:w-[24px] md:h-[24px]" strokeWidth={3} />
                </button>
            </footer>
        </>
    );
}
