import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

export default function Navbar({ activeSection = 0, onNavigate, sections = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (index) => {
    if (onNavigate) {
      onNavigate(index);
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-40 transition-all duration-300 bg-surface/80 backdrop-blur-md shadow-lg border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick(0)}
              className="text-2xl font-bold font-grotesk tracking-tighter text-white hover:text-cyan-accent transition-colors cursor-pointer"
            >
              SHAM<span className="text-cyan-accent">.</span>
            </button>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(index)}
                  className={`font-mono text-sm tracking-wide transition-all cursor-pointer bg-transparent border-none outline-none relative ${
                    activeSection === index
                      ? 'text-cyan-accent font-bold drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {section.name}
                  {activeSection === index && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #00e5ff, transparent)',
                        boxShadow: '0 0 8px rgba(0, 229, 255, 0.5)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
              <a 
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                download
                className="group flex items-center space-x-2 px-4 py-2 rounded-full border border-cyan-accent/50 hover:border-cyan-accent bg-cyan-accent/10 hover:bg-cyan-accent/20 transition-all text-cyan-accent text-sm font-mono"
              >
                <Download size={16} className="group-hover:translate-y-1 transition-transform" />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(index)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-mono cursor-pointer bg-transparent border-none ${
                    activeSection === index
                      ? 'text-cyan-accent bg-cyan-accent/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {section.name}
                </button>
              ))}
              <a 
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                download
                className="mt-4 flex items-center justify-center space-x-2 px-4 py-3 rounded-md border border-cyan-accent/50 bg-cyan-accent/10 text-cyan-accent font-mono w-full"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
