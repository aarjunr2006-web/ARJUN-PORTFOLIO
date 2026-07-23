import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Globe,
  Layout,
  Rocket,
  Gauge,
  Briefcase,
  Palette,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  const services: ServiceItem[] = [
    {
      title: 'Website Development',
      description: 'Custom full-stack web applications built with React, Next.js, Node.js, and FastAPI. High performance and clean architecture.',
      icon: <Globe size={26} className="text-accent-blue" />,
      tags: ['React', 'Next.js', 'TypeScript', 'APIs'],
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered digital designs, design systems, interactive prototypes, and Figma wireframes tailored for seamless usability.',
      icon: <Layout size={26} className="text-accent-purple" />,
      tags: ['Figma', 'Wireframing', 'UX Research'],
    },
    {
      title: 'Landing Pages',
      description: 'High-converting, sleek landing pages with high-impact typography, smooth micro-interactions, and conversion-optimized CTAs.',
      icon: <Rocket size={26} className="text-accent-cyan" />,
      tags: ['Aesthetics', 'Animations', 'SEO'],
    },
    {
      title: 'Dashboard Design',
      description: 'Complex data dashboards and operator UIs built for speed, real-time data visualization, and intuitive admin workflows.',
      icon: <Gauge size={26} className="text-accent-blue" />,
      tags: ['Data Viz', 'Analytics', 'Dark Mode'],
    },
    {
      title: 'Portfolio Design',
      description: 'Award-winning developer and executive portfolio websites designed to wow recruiters, investors, and high-value clients.',
      icon: <Briefcase size={26} className="text-accent-purple" />,
      tags: ['3D Canvas', 'Framer Motion', 'Personal Brand'],
    },
    {
      title: 'Brand Identity',
      description: 'Cohesive visual identity, social media graphic assets, video reel editing, and digital media direction for growth.',
      icon: <Palette size={26} className="text-accent-cyan" />,
      tags: ['Reel Edits', 'Visual Assets', 'Branding'],
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      className="section-py px-4 sm:px-6 relative z-10"
      aria-label="Services Section"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 font-mono text-xs text-accent-blue tracking-widest uppercase font-semibold">
            <Sparkles size={14} />
            <span>05 // Solutions Offered</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-white">
            Services & <span className="gradient-text-blue-purple">Expertise</span>
          </h2>
        </div>

        {/* Services Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-card p-7 border border-white/10 hover:border-accent-blue/50 flex flex-col justify-between group transition-all duration-400"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-bg-surface border border-white/10 flex items-center justify-center shadow-glass group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <ArrowUpRight size={18} className="text-text-muted group-hover:text-accent-blue transition-colors" />
                </div>

                <h3 className="font-heading text-2xl font-bold text-text-white group-hover:text-accent-blue transition-colors">
                  {item.title}
                </h3>

                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-white/5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-text-light/70 bg-bg-surface border border-white/5 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
