import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      quote:
        "Arjun built the Krishna Jewels website with outstanding attention to detail. The luxury presentation and smooth UI performance exceeded our expectations completely.",
      name: "Rajesh S.",
      role: "Founder",
      company: "Krishna Jewels",
      rating: 5,
    },
    {
      quote:
        "Thikana campus platform solved a huge local directory gap for students. Arjun's full-stack implementation and API response speed are top-tier.",
      name: "Priya V.",
      role: "Student Lead",
      company: "LMC Jodhpur",
      rating: 5,
    },
    {
      quote:
        "Working with Arjun on our AI chat platform was seamless. Fast delivery, clean TypeScript code, and exceptional modern visual aesthetics.",
      name: "Karan M.",
      role: "Product Manager",
      company: "AURA Digital",
      rating: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-py px-4 sm:px-6 relative z-10"
      aria-label="Testimonials Section"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 font-mono text-xs text-accent-purple tracking-widest uppercase font-semibold">
            <Sparkles size={14} />
            <span>06 // Client Endorsements</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-white">
            Client & <span className="gradient-text-blue-purple">Peer Reviews</span>
          </h2>
        </div>

        {/* Glass Carousel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative glass-card rounded-hero p-8 sm:p-12 border border-white/10 shadow-2xl overflow-hidden min-h-[280px] flex flex-col justify-between"
        >
          <Quote size={48} className="text-accent-blue/20 absolute top-6 right-8 pointer-events-none" />

          {/* Testimonial Content */}
          <div className="relative z-10 space-y-6">
            <div className="flex gap-1">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} size={16} className="fill-accent-cyan text-accent-cyan" />
              ))}
            </div>

            <p className="font-body text-lg sm:text-2xl text-text-white leading-relaxed font-medium italic">
              "{testimonials[activeIndex].quote}"
            </p>

            <div>
              <h4 className="font-heading text-xl font-bold text-text-white">
                {testimonials[activeIndex].name}
              </h4>
              <p className="font-mono text-xs text-accent-cyan">
                {testimonials[activeIndex].role} • {testimonials[activeIndex].company}
              </p>
            </div>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-white/10 z-10">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? 'w-8 bg-gradient-to-r from-accent-blue to-accent-purple'
                      : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-bg-surface border border-white/10 hover:border-accent-blue/50 flex items-center justify-center text-text-muted hover:text-text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-bg-surface border border-white/10 hover:border-accent-blue/50 flex items-center justify-center text-text-muted hover:text-text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
