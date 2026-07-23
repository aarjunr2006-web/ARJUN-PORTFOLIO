import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { personal } from '../data';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-dark/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-glass'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="font-heading text-xl font-bold tracking-tight text-text-white flex items-center gap-1.5"
            aria-label="Back to top"
          >
            <span>ARJUN</span>
            <span className="gradient-text-blue-purple">.R</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-heading text-xs font-semibold text-text-muted hover:text-text-white transition-colors tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Hire Me CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href={personal.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple text-text-white font-heading font-semibold text-xs px-5 py-2.5 rounded-full shadow-glow-blue transition-transform hover:scale-105 active:scale-95"
              id="btn-hire-me-nav"
            >
              <Sparkles size={14} />
              <span>HIRE ME</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-text-muted hover:text-text-white p-2"
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-bg-dark/95 backdrop-blur-2xl border-b border-white/10 lg:hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="font-heading text-sm font-semibold text-text-muted hover:text-text-white transition-colors py-1 uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={personal.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="mt-2 text-center bg-gradient-to-r from-accent-blue to-accent-purple text-text-white font-heading font-bold text-xs px-4 py-3 rounded-full shadow-glow-blue"
              >
                HIRE ME ON WHATSAPP
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
