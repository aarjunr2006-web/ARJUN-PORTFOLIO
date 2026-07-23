import { useState, useCallback } from 'react';
import './index.css';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import About from './components/About';
import Skillset from './components/Skillset';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      <AnimatedBackground />

      {/* Main content wrapper */}
      <div
        className="relative z-10"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <MarqueeStrip />
          <About />
          <Skillset />
          <Projects />
          <Journey />
          <Services />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
