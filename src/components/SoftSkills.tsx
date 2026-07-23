import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { softSkills } from '../data';
import { ShieldCheck, MessageSquare, Users, Sparkles, Brain, Clock, Zap, Target } from 'lucide-react';

const icons = [
  <ShieldCheck size={20} className="text-accent" />,
  <MessageSquare size={20} className="text-accent" />,
  <Users size={20} className="text-accent" />,
  <Sparkles size={20} className="text-accent" />,
  <Brain size={20} className="text-accent" />,
  <Zap size={20} className="text-accent" />,
  <Target size={20} className="text-accent" />,
  <Clock size={20} className="text-accent" />,
];

export default function SoftSkills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  return (
    <section
      id="soft-skills"
      ref={ref}
      className="section-py px-4 sm:px-6 relative overflow-hidden"
      aria-label="Professional soft skills section"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="font-mono text-xs text-accent uppercase tracking-[0.25em] font-semibold">
            // Core Competencies
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            PROFESSIONAL SOFT SKILLS 🧠
          </h2>
          <p className="font-body text-text-muted max-w-xl mx-auto text-sm sm:text-base">
            Essential traits that make me an effective engineer, team player, and communicator.
          </p>
        </div>

        {/* 8 Soft Skills Grid matching video */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {softSkills.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="bg-surface border border-white/8 rounded-card p-6 card-3d flex flex-col justify-between text-center items-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                {icons[idx]}
              </div>

              <h3 className="font-mono text-xs font-extrabold text-white tracking-wider mb-2">
                {item.title}
              </h3>

              <p className="font-body text-xs text-text-muted leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
