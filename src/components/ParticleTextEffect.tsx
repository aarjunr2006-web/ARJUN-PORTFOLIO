import { useEffect, useRef } from 'react';

interface ParticleTextEffectProps {
  texts?: string[];
  intervalMs?: number;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
}

const DEFAULT_TEXTS = [
  "ARJUN RATHORE",
  "FULL STACK DEVELOPER",
  "UI/UX DESIGNER",
  "CREATIVE ENGINEER",
];

const COLORS = ['#3B82F6', '#8B5CF6', '#06B6D4', '#FFFFFF', '#60A5FA', '#C084FC'];

export default function ParticleTextEffect({
  texts = DEFAULT_TEXTS,
  intervalMs = 3800,
}: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textIndexRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; radius: number }>({
    x: -9999,
    y: -9999,
    radius: 120,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
      sampleTextParticles(texts[textIndexRef.current]);
    };

    window.addEventListener('resize', handleResize);

    // Offscreen sampling
    const sampleTextParticles = (text: string) => {
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offscreen.width = width;
      offscreen.height = height;

      // Font sizing based on screen width
      const fontSize = Math.min(width * 0.085, height * 0.16, 96);
      offCtx.font = `900 ${fontSize}px "Space Grotesk", sans-serif`;
      offCtx.fillStyle = '#FFFFFF';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';

      offCtx.fillText(text, width / 2, height / 2);

      const imageData = offCtx.getImageData(0, 0, width, height).data;
      const points: { x: number; y: number }[] = [];

      // Step density based on canvas size
      const step = width < 640 ? 5 : width < 1024 ? 4 : 3;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = imageData[index + 3];
          if (alpha > 128) {
            points.push({ x, y });
          }
        }
      }

      const existingParticles = particlesRef.current;
      const newParticles: Particle[] = [];

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const color = COLORS[i % COLORS.length];

        if (i < existingParticles.length) {
          const p = existingParticles[i];
          p.targetX = pt.x;
          p.targetY = pt.y;
          p.color = color;
          newParticles.push(p);
        } else {
          newParticles.push({
            x: width / 2 + (Math.random() - 0.5) * 200,
            y: height / 2 + (Math.random() - 0.5) * 200,
            originX: pt.x,
            originY: pt.y,
            targetX: pt.x,
            targetY: pt.y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            color,
            size: Math.random() * 1.8 + 1.2,
            alpha: 1,
          });
        }
      }

      particlesRef.current = newParticles;
    };

    sampleTextParticles(texts[0]);

    // Text rotation interval
    const textTimer = setInterval(() => {
      textIndexRef.current = (textIndexRef.current + 1) % texts.length;
      sampleTextParticles(texts[textIndexRef.current]);
    }, intervalMs);

    // Mouse movement tracker
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Smooth attraction to target
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        p.vx += dx * 4.5 * dt;
        p.vy += dy * 4.5 * dt;
        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;

        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(mdy, mdx);
          p.x += Math.cos(angle) * force * 12;
          p.y += Math.sin(angle) * force * 12;
        }

        // Draw particle dot with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.85;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      clearInterval(textTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [texts, intervalMs]);

  return (
    <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] flex items-center justify-center pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
      />
    </div>
  );
}
