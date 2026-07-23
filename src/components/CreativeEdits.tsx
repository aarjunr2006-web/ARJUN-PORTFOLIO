import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { creativeEdits, personal } from '../data';
import { Film, Clapperboard, Video, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';

const icons = [
  <Film size={20} className="text-accent" />,
  <Clapperboard size={20} className="text-accent" />,
  <Video size={20} className="text-accent" />,
  <InstagramIcon size={20} />,
];

export default function CreativeEdits() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  return (
    <section
      id="creative"
      ref={ref}
      className="section-py px-4 sm:px-6 bg-[#0E0E14] border-t border-white/5 relative"
      aria-label="Creative edits section"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="font-mono text-xs text-accent uppercase tracking-[0.25em] font-semibold">
            // Cinematic Content
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Creative Direction & Cinematic Edits 🎬
          </h2>
          <p className="font-body text-text-muted max-w-xl mx-auto text-sm sm:text-base">
            Beyond coding, I craft visual stories with premium editing, color grading, and high-impact sound rhythm.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {creativeEdits.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-surface border border-white/8 rounded-card p-6 card-3d flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                  <span className="font-mono text-xs text-accent font-semibold px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/6">
                <a
                  href={personal.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:text-white transition-colors"
                >
                  Watch Reel Samples <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-4">
          <a
            href={personal.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-accent hover:bg-accent-hover text-white font-mono text-xs font-bold px-6 py-3.5 rounded-full shadow-glow-red transition-transform active:scale-95"
          >
            <InstagramIcon size={16} />
            <span>Follow My Edits on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
