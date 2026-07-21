import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Articles from './pages/Articles';
import Profiles from './pages/Profiles';
import Contact from './pages/Contact';
import Certifications from './pages/Certifications';

const SECTIONS = [
  { id: 'home',           name: 'Home',    Component: Home },
  { id: 'about',          name: 'About',   Component: About },
  { id: 'skills',         name: 'Skills',  Component: Skills },
  { id: 'projects',       name: 'Projects',Component: Projects },
  { id: 'articles',       name: 'Articles',Component: Articles },
  { id: 'certifications', name: 'Certs',   Component: Certifications },
  { id: 'profiles',       name: 'Profiles',Component: Profiles },
  { id: 'contact',        name: 'Contact', Component: Contact },
];

/* ── Single section with cinematic reveal ── */
function CinemaSection({ id, Component, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Smooth spring for all transforms
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // Entry: slides up from below, fades + unblurs
  const y       = useTransform(smoothProgress, [0, 0.25, 0.75, 1], [60, 0, 0, -40]);
  const opacity = useTransform(smoothProgress, [0, 0.18, 0.75, 1], [0,  1,  1,  0]);
  const scale   = useTransform(smoothProgress, [0, 0.2,  0.8,  1], [0.94, 1, 1, 0.97]);
  const blur    = useTransform(smoothProgress, [0, 0.2], [8, 0]);
  const filter  = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section
      ref={ref}
      id={`section-${id}`}
      className="relative w-full"
      style={{ minHeight: '100vh' }}
    >
      <motion.div
        style={{ y, opacity, scale, filter, willChange: 'transform, opacity, filter' }}
        className="w-full h-full"
      >
        <Component />
      </motion.div>
    </section>
  );
}

/* ── Active section tracker via IntersectionObserver ── */
function useActiveSection(count) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observers = [];
    for (let i = 0; i < count; i++) {
      const el = document.getElementById(`section-${SECTIONS[i].id}`);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [count]);
  return active;
}

function App() {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const activeSection = useActiveSection(SECTIONS.length);

  // Progress bar driven by native scroll
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const navigateTo = useCallback((index) => {
    const el = document.getElementById(`section-${SECTIONS[index].id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-screen w-screen overflow-hidden relative"
          >
            <Navbar
              activeSection={activeSection}
              onNavigate={navigateTo}
              sections={SECTIONS}
            />

            {/* Native smooth scroll container */}
            <div
              ref={scrollRef}
              className="w-full h-screen overflow-y-scroll overflow-x-hidden"
              style={{ scrollBehavior: 'smooth' }}
            >
              {SECTIONS.map(({ id, Component }, index) => (
                <CinemaSection key={id} id={id} Component={Component} index={index} />
              ))}
            </div>

            {/* Section indicator dots */}
            <div className="section-dots">
              {SECTIONS.map((section, index) => (
                <div key={section.id} className="section-dot-wrapper">
                  <span className="section-dot-label">{section.name}</span>
                  <button
                    onClick={() => navigateTo(index)}
                    className={`section-dot ${activeSection === index ? 'active' : ''}`}
                    aria-label={`Go to ${section.name}`}
                  />
                </div>
              ))}
            </div>

            {/* Vertical progress bar */}
            <div className="snap-progress-track">
              <motion.div
                className="snap-progress-fill"
                style={{ height: progressHeight }}
              />
            </div>

            {/* Scroll hint */}
            <AnimatePresence>
              {activeSection === 0 && (
                <motion.div
                  className="scroll-hint"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <span>Scroll to explore</span>
                  <span className="scroll-hint-arrow">↓</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
