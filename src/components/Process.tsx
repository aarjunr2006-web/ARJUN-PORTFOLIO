import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { processSteps } from '../data';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

const stepIcons = [
  <Search size={20} className="text-accent" />,
  <PenTool size={20} className="text-accent" />,
  <Code size={20} className="text-accent" />,
  <Rocket size={20} className="text-accent" />,
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  return (
    <section
      id="process"
      ref={ref}
      className="section-py px-4 sm:px-6 bg-[#0B0B10] border-t border-white/5 relative"
      aria-label="Process section"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="font-mono text-xs text-accent uppercase tracking-[0.25em] font-semibold">
            // My Process
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Here's how I turn ideas into real-world applications 🛠️
          </h2>
          <p className="font-body text-text-muted max-w-xl mx-auto text-sm sm:text-base">
            A structured, creative, and highly technical approach to transforming raw concepts into robust software.
          </p>
        </div>

        {/* 4 Steps Grid matching video */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-surface border border-white/8 rounded-card p-6 card-3d flex flex-col justify-between relative group overflow-hidden"
            >
              {/* Red glow top border accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    {stepIcons[idx]}
                  </div>
                  <span className="font-mono text-xl font-black text-white/20 group-hover:text-accent transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
