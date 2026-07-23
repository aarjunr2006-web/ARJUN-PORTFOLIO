import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Server,
  Layout,
  Database,
  Cloud,
  Cpu,
  Sparkles,
} from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: { name: string; level: number }[];
}

export default function Skillset() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  const categories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: <Code2 className="text-accent-blue" size={24} />,
      color: 'from-accent-blue/20 to-accent-purple/10',
      skills: [
        { name: 'React / Next.js', level: 92 },
        { name: 'TypeScript', level: 88 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'HTML5 / CSS3', level: 98 },
      ],
    },
    {
      title: 'Backend',
      icon: <Server className="text-accent-purple" size={24} />,
      color: 'from-accent-purple/20 to-accent-cyan/10',
      skills: [
        { name: 'Node.js & Express', level: 88 },
        { name: 'FastAPI & Python', level: 85 },
        { name: 'REST & GraphQL APIs', level: 90 },
        { name: 'Microservices', level: 80 },
      ],
    },
    {
      title: 'UI/UX Design',
      icon: <Layout className="text-accent-cyan" size={24} />,
      color: 'from-accent-cyan/20 to-accent-blue/10',
      skills: [
        { name: 'Figma & Wireframing', level: 90 },
        { name: 'Design Systems', level: 92 },
        { name: 'User Research', level: 82 },
        { name: 'Interactive Prototypes', level: 88 },
      ],
    },
    {
      title: 'Database',
      icon: <Database className="text-accent-blue" size={24} />,
      color: 'from-accent-blue/20 to-accent-cyan/10',
      skills: [
        { name: 'MongoDB', level: 90 },
        { name: 'PostgreSQL & SQL', level: 86 },
        { name: 'Redis Caching', level: 82 },
        { name: 'Prisma ORM', level: 88 },
      ],
    },
    {
      title: 'Cloud & DevOps',
      icon: <Cloud className="text-accent-purple" size={24} />,
      color: 'from-accent-purple/20 to-accent-blue/10',
      skills: [
        { name: 'Vercel & Netlify', level: 95 },
        { name: 'Docker & Containers', level: 80 },
        { name: 'AWS & Cloud Services', level: 78 },
        { name: 'Git & GitHub Actions', level: 92 },
      ],
    },
    {
      title: 'AI & Tools',
      icon: <Cpu className="text-accent-cyan" size={24} />,
      color: 'from-accent-cyan/20 to-accent-purple/10',
      skills: [
        { name: 'OpenAI & Claude APIs', level: 90 },
        { name: 'AI Prompt Engineering', level: 94 },
        { name: 'VS Code & WebStorm', level: 96 },
        { name: 'Postman & API Tools', level: 92 },
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="section-py px-4 sm:px-6 relative z-10"
      aria-label="Skills Section"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 font-mono text-xs text-accent-purple tracking-widest uppercase font-semibold">
            <Sparkles size={14} />
            <span>02 // Core Competencies</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-white">
            Technical Arsenal & <span className="gradient-text-blue-purple">Capabilities</span>
          </h2>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-card p-6 border border-white/10 relative group hover:border-accent-purple/50 transition-all duration-400 overflow-hidden"
            >
              {/* Background Accent Gradient */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${cat.color} blur-2xl opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none`}
              />

              <div className="relative z-10 space-y-6">
                {/* Header Icon + Title */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-bg-surface border border-white/10 flex items-center justify-center shadow-glass">
                    {cat.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-text-white">
                    {cat.title}
                  </h3>
                </div>

                {/* Progress Bars */}
                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-text-light">{skill.name}</span>
                        <span className="text-text-muted">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-bg-surface rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.3 + idx * 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
