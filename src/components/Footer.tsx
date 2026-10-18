import React from 'react';
import { Github, Linkedin, Mail, MapPin, ArrowUp } from 'lucide-react';
import { CHAT_ENABLED } from '../config/layout';
import logoImg from '../assets/logo.webp?w=96&h=96&fit=cover&format=webp';

const EMAIL_LINK = 'https://mail.google.com/mail/?view=cm&fs=1&to=josh.dizon.aguiluz25@gmail.com';

const QUICK_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Resume', id: 'resume' },
  { name: 'Blog', id: 'blog' },
  { name: 'Contact', id: 'contact' },
];

const SOCIALS = [
  { href: 'https://github.com/Josh-Aguiluz', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/josh-aguiluz-0a150a350/', label: 'LinkedIn', Icon: Linkedin },
  { href: EMAIL_LINK, label: 'Email', Icon: Mail },
];

export default function Footer({ showBackToTop }: { showBackToTop: boolean }) {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* About */}
        <div>
          <a href="#home" className="inline-flex items-center gap-3 rounded-md">
            <img src={logoImg} alt="" width={36} height={36} loading="lazy" decoding="async" className="h-9 w-9 rounded-full" />
            <span className="font-semibold tracking-tight">Josh Andrei Aguiluz</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
            Backend-focused Full-Stack Engineer | Scalable Systems
          </p>
          <ul className="mt-6 flex gap-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="icon-btn">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className="font-mono text-xs font-normal text-fg-subtle">Quick Links</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-1">
            {QUICK_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="inline-flex min-h-9 items-center text-sm text-fg-muted transition-colors hover:text-fg">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="font-mono text-xs font-normal text-fg-subtle">Contact Me</h2>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={EMAIL_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 break-all text-sm text-fg-muted transition-colors hover:text-fg">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /> josh.dizon.aguiluz25@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Magalang%2C+Pampanga"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" /> Magalang, Pampanga
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="container-page py-6 font-mono text-xs text-fg-subtle">
          © 2026 Josh Andrei Aguiluz. All rights reserved. Built with React & TypeScript.
        </p>
      </div>

      {/* Back to top (appears after scrolling) */}
      <a
        href="#home"
        aria-label="Back to top"
        tabIndex={showBackToTop ? 0 : -1}
        aria-hidden={!showBackToTop}
        className={`icon-btn fixed right-4 z-40 !rounded-full !bg-surface transition-[opacity,transform] duration-200 md:right-6 ${
          CHAT_ENABLED ? 'bottom-28 md:bottom-32' : 'bottom-4 md:bottom-6'
        } ${
          showBackToTop ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        <ArrowUp className="h-[18px] w-[18px]" aria-hidden="true" />
      </a>
    </footer>
  );
}
