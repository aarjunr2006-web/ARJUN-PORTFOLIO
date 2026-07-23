import { motion } from 'framer-motion';
import { ArrowUpRight, Send, Mail } from 'lucide-react';
import ParticleTextEffect from './ParticleTextEffect';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import { personal } from '../data';

export default function Hero() {
  const socialLinks = [
    { name: 'GitHub', icon: <GithubIcon size={18} />, href: personal.github },
    { name: 'LinkedIn', icon: <LinkedinIcon size={18} />, href: personal.linkedin },
    { name: 'Instagram', icon: <InstagramIcon size={18} />, href: personal.instagram },
    { name: 'Email', icon: <Mail size={18} />, href: `mailto:${personal.email}` },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center pt-28 pb-12 px-4 sm:px-6 z-10 overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Availability Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2.5 bg-bg-surface/80 backdrop-blur-md px-4 py-2 rounded-full border border-bg-border shadow-glass"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-blue"></span>
        </span>
        <span className="font-mono text-xs text-text-light/90 font-medium tracking-wide">
          Available for Opportunities & Freelance
        </span>
      </motion.div>

      {/* Main Particle Text Showcase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-6xl mx-auto my-auto text-center relative"
      >
        {/* Particle Canvas Morphing Text */}
        <ParticleTextEffect
          texts={[
            'ARJUN RATHORE',
            'FULL STACK DEVELOPER',
            'UI/UX DESIGNER',
            'CREATIVE ENGINEER',
          ]}
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-body text-base sm:text-lg lg:text-xl text-text-muted max-w-2xl mx-auto mt-4 px-4 leading-relaxed font-normal"
        >
          Crafting modern digital experiences — where high-performance engineering meets luxury UI/UX design.
        </motion.p>
      </motion.div>

      {/* Bottom CTA Row & Social Icons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-bg-border/50"
      >
        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            id="btn-hero-view-work"
            className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-heading font-semibold text-sm px-7 py-3.5 rounded-full shadow-glow-blue transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>View Projects</span>
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#contact"
            id="btn-hero-hire"
            className="inline-flex items-center gap-2 bg-bg-surface/80 hover:bg-bg-surface text-text-white border border-bg-border hover:border-accent-purple/50 font-heading font-semibold text-sm px-7 py-3.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 shadow-glass"
          >
            <Send size={16} className="text-accent-cyan" />
            <span>Hire Me</span>
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="w-10 h-10 rounded-full bg-bg-surface/80 border border-bg-border hover:border-accent-blue/50 flex items-center justify-center text-text-muted hover:text-text-white hover:bg-accent-blue/10 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-glass"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
