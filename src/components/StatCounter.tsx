import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

export default function StatCounter({ value, label, suffix = '', delay = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      const timeout = setTimeout(() => {
        const duration = 1200;
        const steps = 50;
        const increment = value / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          current = Math.min(Math.round(increment * step), value);
          setCount(current);
          if (step >= steps) clearInterval(timer);
        }, duration / steps);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [inView, value, delay]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center">
      <div className="font-display text-5xl font-bold text-accent tabular-nums leading-none">
        {count}
        <span className="text-3xl">{suffix}</span>
      </div>
      <div className="font-mono text-xs text-text-muted tracking-wider uppercase mt-2">
        {label}
      </div>
    </div>
  );
}
