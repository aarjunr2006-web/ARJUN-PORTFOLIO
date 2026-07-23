import { useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { projects } from '../data';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="section-py px-4 sm:px-6 relative z-10"
      aria-label="Featured Projects Section"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 font-mono text-xs text-accent-blue tracking-widest uppercase font-semibold">
            <Sparkles size={14} />
            <span>03 // Selected Work</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-white">
            Featured <span className="gradient-text-blue-purple">Projects & Products</span>
          </h2>
          <p className="font-body text-text-muted max-w-xl mx-auto text-sm sm:text-base">
            High-performance full-stack web applications, AI platforms, and campus digital tools shipped with precision.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <ProjectCard
              key={proj.id}
              id={proj.id}
              title={proj.title}
              subtitle={proj.subtitle}
              description={proj.description}
              tags={proj.tags}
              image={proj.image}
              link={proj.link}
              github={proj.github}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
