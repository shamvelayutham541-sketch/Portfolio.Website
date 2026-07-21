import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, useMotionValue, AnimatePresence } from 'framer-motion';
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

function App() {
  const [loading, setLoading]         = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [showHint, setShowHint]       = useState(true);
  const controls     = useAnimation();
  const y            = useMotionValue(0);
  const isAnimating  = useRef(false);
  const wheelTimeout = useRef(null);

  // Loading screen — 1.5 s
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  // Hide scroll hint after first move
  useEffect(() => {
    if (activeSection > 0) setShowHint(false);
  }, [activeSection]);

  const getSectionY = useCallback(
    (index) => -index * window.innerHeight,
    []
  );

  // Fast spring snap
  const navigateTo = useCallback((index) => {
    if (isAnimating.current) return;
    const clamped = Math.max(0, Math.min(SECTIONS.length - 1, index));
    if (clamped === activeSection) return;

    isAnimating.current = true;
    setActiveSection(clamped);

    controls.start({
      y: getSectionY(clamped),
      transition: {
        type: 'spring',
        stiffness: 500,   // high stiffness = fast
        damping: 48,
        mass: 0.6,
      },
    }).then(() => {
      isAnimating.current = false;
    });
  }, [activeSection, controls, getSectionY]);

  // Mouse wheel → vertical navigation
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (wheelTimeout.current) return;
      wheelTimeout.current = setTimeout(() => {
        wheelTimeout.current = null;
      }, 550);

      if (e.deltaY > 10)       navigateTo(activeSection + 1);
      else if (e.deltaY < -10) navigateTo(activeSection - 1);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, navigateTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        navigateTo(activeSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateTo(activeSection - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, navigateTo]);

  // Touch swipe support
  useEffect(() => {
    let touchStartY = 0;
    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd   = (e) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) {
        delta > 0 ? navigateTo(activeSection + 1) : navigateTo(activeSection - 1);
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, [activeSection, navigateTo]);

  // Re-snap on resize
  useEffect(() => {
    const handleResize = () => controls.set({ y: getSectionY(activeSection) });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection, controls, getSectionY]);

  // Drag (swipe) support
  const handleDragEnd = (_, info) => {
    const threshold = window.innerHeight * 0.15;
    if (info.offset.y < -threshold || info.velocity.y < -300) navigateTo(activeSection + 1);
    else if (info.offset.y > threshold || info.velocity.y > 300) navigateTo(activeSection - 1);
    else controls.start({ y: getSectionY(activeSection), transition: { type: 'spring', stiffness: 500, damping: 48, mass: 0.6 } });
  };

  const progressHeight = (activeSection / (SECTIONS.length - 1)) * 100;

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
            transition={{ duration: 0.4 }}
            className="h-screen w-screen overflow-hidden relative"
          >
            <Navbar
              activeSection={activeSection}
              onNavigate={navigateTo}
              sections={SECTIONS}
            />

            {/* Vertical snap container */}
            <motion.div
              className="snap-container"
              drag="y"
              dragConstraints={{
                top:    getSectionY(SECTIONS.length - 1),
                bottom: 0,
              }}
              dragElastic={0.06}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              animate={controls}
              style={{ y }}
            >
              {SECTIONS.map(({ id, Component }) => (
                <div key={id} id={`section-${id}`} className="snap-section">
                  <Component />
                </div>
              ))}
            </motion.div>

            {/* Section indicator dots — right side (vertical) */}
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

            {/* Vertical progress bar — right edge */}
            <div className="snap-progress-track">
              <div
                className="snap-progress-fill"
                style={{ height: `${progressHeight}%` }}
              />
            </div>

            {/* Scroll hint */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  className="scroll-hint"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 1, duration: 0.6 }}
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
