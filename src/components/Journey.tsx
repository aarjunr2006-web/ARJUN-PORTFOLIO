import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Briefcase, Sparkles } from 'lucide-react';
import { journey } from '../data';

export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  return (
    <section
      id="journey"
      ref={ref}
      className="section-py px-4 sm:px-6 relative z-10"
      aria-label="Experience & Journey Section"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 font-mono text-xs text-accent-cyan tracking-widest uppercase font-semibold">
            <Sparkles size={14} />
            <span>04 // Experience & Timeline</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-white">
            My Professional <span className="gradient-text-blue-purple">Journey</span>
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-white/10 pl-6 sm:pl-10 space-y-12 ml-4 sm:ml-8">
          {journey.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-bg-card border-2 border-accent-blue flex items-center justify-center shadow-glow-blue group-hover:scale-125 transition-transform duration-300">
                {item.type === 'education' ? (
                  <GraduationCap size={14} className="text-accent-blue" />
                ) : (
                  <Briefcase size={14} className="text-accent-purple" />
                )}
              </div>

              {/* Card Container */}
              <div className="glass-card rounded-card p-6 border border-white/10 space-y-3 hover:border-accent-purple/40 transition-all duration-300">
                <span className="font-mono text-xs text-accent-purple font-semibold bg-accent-purple/10 border border-accent-purple/20 px-3 py-1 rounded-full inline-block">
                  {item.date}
                </span>

                <h3 className="font-heading text-2xl font-bold text-text-white">
                  {item.title}
                </h3>

                <p className="font-mono text-xs text-accent-cyan font-medium">
                  {item.place}
                </p>

                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
