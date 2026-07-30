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
function CinemaSection({ id, Component, scrollContainer }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 18,
    restDelta: 0.001,
  });

  const y       = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [55,  0,  0, -35]);
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.8, 1], [0,   1,  1,  0]);
  const scale   = useTransform(smoothProgress, [0, 0.2,  0.8,  1], [0.95, 1, 1, 0.97]);
  const blurVal = useTransform(smoothProgress, [0, 0.2], [10, 0]);
  const filter  = useTransform(blurVal, (v) => `blur(${v}px)`);

  return (
    <section
      ref={ref}
      id={`section-${id}`}
      style={{ minHeight: '100vh', width: '100%', position: 'relative' }}
    >
      <motion.div
        style={{ y, opacity, scale, filter, willChange: 'transform, opacity, filter' }}
      >
        <Component />
      </motion.div>
    </section>
  );
}

/* ── Active section tracker via IntersectionObserver ── */
function useActiveSection(scrollContainer) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!scrollContainer.current) return;
    const observers = [];

    SECTIONS.forEach((section, i) => {
      const el = document.getElementById(`section-${section.id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { root: scrollContainer.current, threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [scrollContainer]);

  return active;
}

function App() {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const activeSection = useActiveSection(scrollRef);

  // Overall scroll progress for the progress bar
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const navigateTo = useCallback((index) => {
    const el = document.getElementById(`section-${SECTIONS[index].id}`);
    if (el && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: el.offsetTop,
        behavior: 'smooth',
      });
    }
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
            style={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}
          >
            <Navbar
              activeSection={activeSection}
              onNavigate={navigateTo}
              sections={SECTIONS}
            />

            {/* Scroll container — fills below navbar */}
            <div
              ref={scrollRef}
              style={{
                position: 'absolute',
                top: 80,        // navbar height
                left: 0,
                right: 0,
                bottom: 0,
                overflowY: 'scroll',
                overflowX: 'hidden',
              }}
            >
              {SECTIONS.map(({ id, Component }) => (
                <CinemaSection
                  key={id}
                  id={id}
                  Component={Component}
                  scrollContainer={scrollRef}
                />
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
