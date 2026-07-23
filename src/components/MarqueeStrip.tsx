import { useRef } from 'react';
import { skills } from '../data';

const dots = skills.flatMap((s) => [s, '•']);

export default function MarqueeStrip() {
  const innerRef = useRef<HTMLDivElement>(null);

  // Double the array for seamless loop
  const doubled = [...dots, ...dots];

  return (
    <div
      className="marquee-wrapper w-full overflow-hidden border-y border-white/6 py-4 my-0"
      aria-label="Skills marquee"
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className="marquee-inner flex items-center gap-6 whitespace-nowrap"
        style={{
          animation: 'marquee 35s linear infinite',
          width: 'max-content',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={
              item === '•'
                ? 'text-accent text-xs font-mono select-none'
                : 'font-mono text-xs tracking-[0.2em] text-text-muted uppercase select-none'
            }
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
