import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Pause, Volume2 } from 'lucide-react';

interface TalkingAvatarProps {
  speechText: string;
  autoStart?: boolean;
}

export default function TalkingAvatar({ speechText, autoStart = false }: TalkingAvatarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [_, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Framer Motion 3D Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Springs for 3D Body Tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), { stiffness: 220, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 220, damping: 18 });
  const headTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 15 });
  const headTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Function to select a male voice specifically for SpeechSynthesis fallback
  const getMaleVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    const femaleKeywords = ['female', 'zira', 'susan', 'hazel', 'eva', 'samantha', 'victoria', 'karen', 'helena', 'catherine', 'fiona', 'moira', 'veena'];

    const maleVoice = voices.find(v => {
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

    if (maleVoice) return maleVoice;

    const fallbackEn = voices.find(v => {
      const name = v.name.toLowerCase();
      return v.lang.startsWith('en') && !femaleKeywords.some(fk => name.includes(fk));
    });

    return fallbackEn || voices[0] || null;
  }, []);

  // Web Speech Fallback Logic
  const startSpeech = useCallback(() => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(speechText);
    u.rate = 0.92;
    u.pitch = 0.85; // Deep male voice tuning

    const maleV = getMaleVoice();
    if (maleV) {
      u.voice = maleV;
    }

    u.onstart = () => {
      setIsPlaying(true);
    };

    u.onend = () => {
      setIsPlaying(false);
    };

    u.onerror = () => {
      setIsPlaying(false);
    };

    speechRef.current = u;
    window.speechSynthesis.speak(u);
  }, [speechText, getMaleVoice]);

  const stopMedia = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  }, []);

  // Auto-start introduction on page load if requested
  useEffect(() => {
    if (!autoStart) return;

    const timer = setTimeout(() => {
      startSpeech();
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [autoStart, startSpeech]);

  const toggleSpeech = () => {
    if (isPlaying) {
      stopMedia();
    } else {
      startSpeech();
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center perspective-1000">
      {/* 3D Animated Hero Person Container */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: isPlaying ? [0, -6, 0, -4, 0] : [0, -6, 0],
          rotateZ: isPlaying ? [0, 1, -1, 0.5, 0] : [0, 0.5, -0.5, 0],
          scale: isPlaying ? 1.02 : 1,
        }}
        transition={{
          repeat: Infinity,
          duration: isPlaying ? 3 : 4.5,
          ease: 'easeInOut',
        }}
        className="relative w-full max-w-sm aspect-square sm:aspect-[4/5] rounded-hero overflow-hidden border-2 border-white/20 bg-black/40 backdrop-blur-md shadow-2xl group cursor-pointer"
      >
        {/* Media Container (Photo Avatar) */}
        <motion.div
          style={{
            x: headTranslateX,
            y: headTranslateY,
          }}
          className="w-full h-full relative"
        >
          <img
            src="/assets/arjun-unique.png"
            alt="Arjun Rathore Full Stack Developer"
            className={`w-full h-full object-cover transition-all duration-300 ${
              isPlaying ? 'brightness-110 contrast-105' : 'group-hover:brightness-105'
            }`}
          />
        </motion.div>

        {/* Glowing Audio Waves Aura while speaking */}
        {isPlaying && (
          <div className="absolute inset-0 border-2 border-accent rounded-hero animate-ping opacity-30 pointer-events-none" />
        )}

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Dynamic Controls Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs font-mono text-white/90">
            <Volume2 size={14} className={isPlaying ? 'text-accent animate-pulse' : 'text-text-muted'} />
            <span className="truncate max-w-[130px]">
              {isPlaying ? 'Speaking Intro...' : 'Introduction'}
            </span>
          </div>

          <button
            onClick={toggleSpeech}
            id="btn-trigger-speaking-avatar"
            className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-mono text-xs font-bold px-4 py-2.5 rounded-full shadow-glow-red transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause size={14} />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play size={14} className="fill-current ml-0.5" />
                <span>PLAY INTRO 🗣️</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
