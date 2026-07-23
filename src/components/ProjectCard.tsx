import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  link: string | null;
  github: string | null;
  index: number;
}

export default function ProjectCard({
  id,
  title,
  subtitle,
  description,
  tags,
  image,
  link,
  github,
  index,
}: ProjectCardProps) {
  return (
    <motion.article
      id={`project-${id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-card rounded-card overflow-hidden border border-white/10 hover:border-accent-blue/50 transition-all duration-500 shadow-glass flex flex-col justify-between"
    >
      {/* Thumbnail Image Container */}
      <div className="relative overflow-hidden aspect-[16/10] bg-bg-surface">
        <img
          src={image}
          alt={`${title} screenshot`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />

        {/* Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent opacity-80 pointer-events-none" />

        {/* Index Pill */}
        <div className="absolute top-4 left-4 font-mono text-xs font-semibold text-text-white bg-bg-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
          #{String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col gap-4 flex-1 justify-between">
        <div className="space-y-2">
          <span className="font-mono text-xs text-accent-cyan tracking-wider font-semibold uppercase">
            {subtitle}
          </span>
          <h3 className="font-heading text-2xl font-bold text-text-white group-hover:text-accent-blue transition-colors">
            {title}
          </h3>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            {description}
          </p>
        </div>

        <div className="space-y-4 pt-2 border-t border-white/5">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-text-light/80 bg-bg-surface/80 border border-white/8 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple text-text-white font-heading font-semibold text-xs px-4 py-2.5 rounded-full shadow-glow-blue transition-transform hover:scale-105 active:scale-95"
              >
                <span>Live Demo</span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <span className="font-mono text-xs text-text-muted/60 italic">
                Internal / Private Demo
              </span>
            )}

            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-text-white bg-bg-surface border border-white/10 hover:border-white/20 px-3.5 py-2 rounded-full transition-colors"
                aria-label={`${title} GitHub`}
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
