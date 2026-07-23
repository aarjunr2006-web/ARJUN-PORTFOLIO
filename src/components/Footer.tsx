import { ArrowUp, Mail } from 'lucide-react';
import { personal } from '../data';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'GitHub', icon: <GithubIcon size={16} />, href: personal.github },
    { name: 'LinkedIn', icon: <LinkedinIcon size={16} />, href: personal.linkedin },
    { name: 'Instagram', icon: <InstagramIcon size={16} />, href: personal.instagram },
    { name: 'Email', icon: <Mail size={16} />, href: `mailto:${personal.email}` },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#projects' },
    { name: 'Journey', href: '#journey' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative z-10 border-t border-white/10 bg-bg-dark/90 backdrop-blur-md py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand Logo & Tagline */}
        <div className="space-y-2 text-center md:text-left">
          <a href="#hero" className="font-heading text-2xl font-bold tracking-tight text-text-white">
            ARJUN<span className="gradient-text-blue-purple">.R</span>
          </a>
          <p className="font-mono text-xs text-text-muted">
            Crafting High-Impact Digital Platforms & UI Systems.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-heading text-sm text-text-muted">
          {quickLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Social Icons & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="w-9 h-9 rounded-full bg-bg-surface border border-white/10 hover:border-accent-blue/40 flex items-center justify-center text-text-muted hover:text-text-white transition-colors"
              >
                {item.icon}
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-text-white flex items-center justify-center shadow-glow-blue hover:scale-110 transition-transform cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-white/5 text-center font-mono text-xs text-text-muted/60">
        © {new Date().getFullYear()} Arjun Rathore. All rights reserved. Built with React, Next.js, Tailwind CSS & Framer Motion.
      </div>
    </footer>
  );
}
