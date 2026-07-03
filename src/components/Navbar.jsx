import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Articles', path: '/articles' },
  { name: 'Certs', path: '/certifications' },
  { name: 'Profiles', path: '/profiles' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-surface/80 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold font-grotesk tracking-tighter text-white hover:text-cyan-accent transition-colors">
              SHAM<span className="text-cyan-accent">.</span>
            </NavLink>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => 
                    `font-mono text-sm tracking-wide transition-all ${isActive ? 'text-cyan-accent font-bold drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]' : 'text-gray-300 hover:text-white'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <a 
                href="/resume.pdf" 
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
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md text-base font-mono ${isActive ? 'text-cyan-accent bg-cyan-accent/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <a 
                href="/resume.pdf" 
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
