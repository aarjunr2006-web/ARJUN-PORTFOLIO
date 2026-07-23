import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Sparkles, Mic } from 'lucide-react';

interface AudioBiosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AudioBiosModal({ isOpen, onClose }: AudioBiosModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [voiceName, setVoiceName] = useState<string>('');

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const speechText =
    "Hi, I'm Arjun Rathore. I'm a full stack developer and computer science student at Lachoo Memorial College, Jodhpur. Passionate about building modern, scalable web applications and creative digital media. Welcome to my portfolio!";

  const words = speechText.split(' ');

  // Function to filter specifically for male AI voices
  const getMaleVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    const femaleKeywords = ['female', 'zira', 'susan', 'hazel', 'eva', 'samantha', 'victoria', 'karen', 'helena', 'catherine', 'fiona', 'moira', 'veena'];

    const male = voices.find(v => {
      const name = v.name.toLowerCase();
      const isFemale = femaleKeywords.some(fk => name.includes(fk));
      if (isFemale) return false;
      return (
        name.includes('male') ||
        name.includes('david') ||
        name.includes('mark') ||
        name.includes('george') ||
        name.includes('alex') ||
        name.includes('daniel') ||
        name.includes('guy') ||
        name.includes('ryan') ||
        name.includes('google us english')
      );
    });

    if (male) return male;

    const fallbackEn = voices.find(v => v.lang.startsWith('en') && !femaleKeywords.some(fk => v.name.toLowerCase().includes(fk)));
    return fallbackEn || voices[0] || null;
  }, []);

  useEffect(() => {
    if (isOpen) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(speechText);
        u.rate = 0.92;
        u.pitch = 0.85; // Tuning for deep male voice

        const mVoice = getMaleVoice();
        if (mVoice) {
          u.voice = mVoice;
          setVoiceName(mVoice.name);
        }

        u.onstart = () => {
          setIsPlaying(true);
          let p = 0;
          timerRef.current = setInterval(() => {
            p += 1;
            setProgress(Math.min(p, 100));
            setMouthOpen(prev => !prev);
            if (p >= 100) clearInterval(timerRef.current);
          }, 140);
        };

        u.onboundary = (e) => {
          if (e.name === 'word') {
            const textBefore = speechText.substring(0, e.charIndex);
            const wCount = textBefore.trim().split(/\s+/).length;
            setCurrentWordIndex(Math.min(wCount, words.length - 1));
          }
        };

        u.onend = () => {
          setIsPlaying(false);
          setProgress(100);
          setCurrentWordIndex(-1);
          setMouthOpen(false);
          if (timerRef.current) clearInterval(timerRef.current);
        };

        speechRef.current = u;
        window.speechSynthesis.speak(u);
      } else {
        setIsPlaying(true);
      }
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      setProgress(0);
      setCurrentWordIndex(-1);
      setMouthOpen(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, getMaleVoice]);

  const togglePlay = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentWordIndex(-1);
      setMouthOpen(false);
    } else {
      if (speechRef.current) {
        window.speechSynthesis.speak(speechRef.current);
        setIsPlaying(true);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-surface border border-accent/40 rounded-card p-6 shadow-glow-red overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-white rounded-full bg-white/5 hover:bg-accent transition-colors"
              aria-label="Close intro player"
            >
              <X size={18} />
            </button>

            {/* Speaking person visualizer container */}
            <div className="flex flex-col items-center text-center gap-5 pt-2">
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-accent p-1 shadow-glow-red">
                <img
                  src="/assets/arjun-unique.png"
                  alt="Arjun Rathore speaking"
                  className={`w-full h-full object-cover rounded-full transition-transform duration-300 ${
                    isPlaying ? 'scale-105 brightness-110' : 'scale-100'
                  }`}
                />
                
                {/* Lip-sync mouth movement overlay */}
                {isPlaying && (
                  <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div
                      className={`w-4 bg-[#1F080C] border border-[#E11D48] rounded-full transition-all duration-100 ${
                        mouthOpen ? 'h-2.5 scale-125' : 'h-1 scale-90'
                      }`}
                    />
                  </div>
                )}

                {/* Audio pulse aura */}
                {isPlaying && (
                  <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping opacity-60 pointer-events-none" />
                )}
              </div>

              {/* Title & Badge */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-mono mb-2">
                  <Sparkles size={12} />
                  <span>3D Talking Avatar • AI Male Voice</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">Arjun Rathore</h3>
                <p className="font-mono text-xs text-text-muted mt-1">
                  Voice: <span className="text-accent">{voiceName || 'Male Voice'}</span>
                </p>
              </div>

              {/* Real-time Word Highlight Transcript */}
              <div className="bg-bg/90 border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-text-muted font-body leading-relaxed max-w-sm text-left">
                {words.map((w, idx) => (
                  <span
                    key={idx}
                    className={`transition-colors duration-150 ${
                      idx === currentWordIndex
                        ? 'text-accent font-bold underline decoration-accent decoration-2'
                        : 'text-white/70'
                    }`}
                  >
                    {w}{' '}
                  </span>
                ))}
              </div>

              {/* Audio Waveform Bars */}
              <div className="flex items-center justify-center gap-1.5 h-8 my-1">
                {[40, 75, 55, 90, 60, 100, 45, 80, 65, 95, 50, 70].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 bg-accent rounded-full"
                    animate={{
                      height: isPlaying ? [12, h * 0.35, 12] : 8,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8 + (i % 3) * 0.2,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="w-full space-y-3 pt-2">
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden relative">
                  <div
                    className="bg-accent h-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between px-2 text-xs font-mono text-text-muted">
                  <span className="flex items-center gap-1">
                    <Mic size={14} className="text-accent" /> Male AI Voice
                  </span>
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-5 py-2 rounded-full font-bold text-xs transition-transform active:scale-95 shadow-glow-red"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isPlaying ? 'PAUSE' : 'SPEAK BIO 🗣️'}</span>
                  </button>
                  <span>{progress}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
