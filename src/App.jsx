import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
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

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <div key="content" className="min-h-screen flex flex-col relative overflow-hidden">
            <Navbar />
            <div className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/certifications" element={<Certifications />} />
                  <Route path="/profiles" element={<Profiles />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
