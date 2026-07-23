import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import StatCounter from './StatCounter';

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  const stats = [
    { value: 3, label: 'Years Learning', suffix: '+' },
    { value: 15, label: 'Projects Built', suffix: '+' },
    { value: 10, label: 'Happy Clients', suffix: '+' },
    { value: 12, label: 'Technologies', suffix: '+' },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="section-py px-4 sm:px-6 relative z-10 overflow-hidden"
      aria-label="About Section"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 font-mono text-xs text-accent-blue tracking-widest uppercase font-semibold">
            <Sparkles size={14} />
            <span>01 // About Me</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-white">
            Driven by Passion, <span className="gradient-text-blue-purple">Engineered for Impact</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-12 gap-10 items-center"
        >
          {/* Left Column — Profile Image with Floating Glow */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-sm aspect-square sm:aspect-[4/5] rounded-hero overflow-hidden glass-card border border-white/10 p-2 shadow-2xl">
              {/* Floating Ambient Glow Ring */}
              <div className="absolute inset-0 rounded-hero bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-cyan opacity-25 blur-xl group-hover:opacity-45 transition-opacity duration-500 pointer-events-none" />

              <div className="relative w-full h-full rounded-[26px] overflow-hidden">
                <img
                  src="/assets/arjun-unique.png"
                  alt="Arjun Rathore Full Stack Developer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent opacity-80 pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-center z-10">
                  <span className="font-mono text-xs font-semibold text-text-white uppercase tracking-wider bg-bg-dark/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 shadow-glass">
                    B.Tech CS Student & Full-Stack Developer
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Biography Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-white">
                Hi, I'm Arjun Rathore 👋
              </h3>
              <p className="font-body text-text-muted text-base sm:text-lg leading-relaxed">
                I am a Computer Science student at <strong className="text-text-white">Lachoo Memorial College, Jodhpur</strong> (Graduation 2029). I specialize in building modern, scalable web applications with high-precision frontend user interfaces and robust backend architectures.
              </p>
              <p className="font-body text-text-muted text-base sm:text-lg leading-relaxed">
                Whether it's crafting full-stack platforms using React, Node.js, Python, MERN, and FastAPI, or designing sleek digital brand experiences, my focus is always on speed, aesthetics, and user-centric execution.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {[
                '2029 Graduation',
                'B.Tech Computer Science',
                'Full-Stack MERN',
                'FastAPI & Python',
                'UI/UX Design Systems',
              ].map((badge) => (
                <span
                  key={badge}
                  className="font-mono text-xs font-semibold text-text-light bg-bg-surface border border-white/10 px-3.5 py-1.5 rounded-full hover:border-accent-purple/40 transition-colors"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Statistics Row */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <StatCounter
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                  delay={i * 120}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
