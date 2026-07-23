import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(intervalRef.current);
        setCount(100);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 800);
        }, 400);
        return;
      }
      setCount(current);
    }, 40);

    return () => clearInterval(intervalRef.current);
  }, [onComplete]);

  const formatted = String(count).padStart(2, '0');

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          {/* Progress line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/5">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${count}%` }}
              transition={{ duration: 0.05, ease: 'linear' }}
            />
          </div>

          {/* Counter */}
          <div className="flex flex-col items-center gap-6">
            {/* Thin accent line above counter */}
            <div className="w-48 h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                style={{ width: `${count}%` }}
                transition={{ duration: 0.05, ease: 'linear' }}
              />
            </div>

            <div className="font-mono text-7xl font-light tracking-tight text-white/90 tabular-nums leading-none">
              {formatted}
            </div>

            <div className="font-mono text-xs text-white/30 tracking-[0.4em] uppercase">
              Loading
            </div>
          </div>

          {/* Bottom name */}
          <div className="absolute bottom-12 font-mono text-xs text-white/20 tracking-[0.3em] uppercase">
            Arjun Rathore
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
