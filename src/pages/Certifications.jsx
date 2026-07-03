import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, Brain, Database, MessageSquare, Fingerprint, Scan, Lock, Unlock } from 'lucide-react';
import GradientBlur from '../components/GradientBlur';

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } },
  out: { opacity: 0 }
};

const certVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 100, damping: 20 } 
  }
};

const certificates = [
  {
    id: 'NA-2026-001',
    title: 'Neural Architecture & Attention',
    topic: 'Transformers, Tokens, and Self-Attention Modelling',
    icon: Brain,
    color: 'from-cyan-500 to-blue-600',
    accent: '#00e5ff',
    date: 'May 14, 2026',
    signatory: { name: 'Dr. Elena Vance', title: 'Senior AI Program Manager' },
    pattern: 'circuit',
    theme: 'dark'
  },
  {
    id: 'PE-2026-002',
    title: 'Advanced Prompt Engineering',
    topic: 'Linguistic Logic and AI-Native Literacy',
    icon: MessageSquare,
    color: 'from-purple-500 to-pink-600',
    accent: '#a78bfa',
    date: 'May 22, 2026',
    signatory: { name: 'Marcus Thorne', title: 'Lead Neural Architect' },
    pattern: 'hexagons',
    theme: 'light'
  },
  {
    id: 'RG-2026-003',
    title: 'Retrieval Augmented Generation',
    topic: 'Vector Databases and Contextual Data Synthesis',
    icon: Database,
    color: 'from-emerald-500 to-teal-600',
    accent: '#34d399',
    date: 'June 05, 2026',
    signatory: { name: 'Sarah Jenkins', title: 'Director of Data Science' },
    pattern: 'grid',
    theme: 'dark'
  },
  {
    id: 'AE-2026-004',
    title: 'AI Ethics & Alignment',
    topic: 'Philosophical Frameworks and Value Alignment',
    icon: ShieldCheck,
    color: 'from-white to-blue-600',
    accent: '#3b82f6',
    date: 'June 13, 2026',
    signatory: { name: 'Prof. Alistair Reed', title: 'Head of AI Ethics Board' },
    pattern: 'waves',
    theme: 'light'
  }
];

const CertificateCard = ({ cert, isUnlocked }) => {
  const isLight = cert.theme === 'light';

  const getPattern = () => {
    switch(cert.pattern) {
      case 'circuit':
        return `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h20v20H10zM70 10h20v20H70zM10 70h20v20H10zM70 70h20v20H70zM30 20h40M30 80h40M20 30v40M80 30v40' stroke='${encodeURIComponent(cert.accent)}' stroke-width='0.5' fill='none' opacity='${isLight ? '0.1' : '0.2'}'/%3E%3Ccircle cx='10' cy='10' r='2' fill='${encodeURIComponent(cert.accent)}' opacity='${isLight ? '0.15' : '0.3'}'/%3E%3Ccircle cx='90' cy='90' r='2' fill='${encodeURIComponent(cert.accent)}' opacity='${isLight ? '0.15' : '0.3'}'/%3E%3C/svg%3E")`;
      case 'hexagons':
        return `url("data:image/svg+xml,%3Csvg width='56' height='100' viewBox='0 0 56 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='${encodeURIComponent(cert.accent)}' stroke-width='1' opacity='${isLight ? '0.05' : '0.1'}'/%3E%3C/svg%3E")`;
      case 'waves':
        return `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 20 50 10 T 100 10' fill='none' stroke='${encodeURIComponent(cert.accent)}' stroke-width='0.5' opacity='${isLight ? '0.1' : '0.2'}'/%3E%3C/svg%3E")`;
      default: // grid
        return `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 40H0V0h40v40zM39 39V1H1v38h38z' fill='none' stroke='${encodeURIComponent(cert.accent)}' stroke-width='0.5' opacity='${isLight ? '0.05' : '0.1'}'/%3E%3C/svg%3E")`;
    }
  };

  return (
    <motion.div
      variants={certVariants}
      initial="hidden"
      animate={isUnlocked ? "visible" : "hidden"}
      whileHover={isUnlocked ? { y: -10, transition: { duration: 0.3 } } : {}}
      className="relative w-full max-w-2xl aspect-[1.4/1] group cursor-default"
    >
      {/* Decorative Outer Glow */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${cert.color} rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000`}></div>
      
      {/* Main Certificate Body */}
      <div 
        className={`relative h-full w-full border ${isLight ? 'border-gray-200' : 'border-white/10'} rounded-2xl overflow-hidden p-8 flex flex-col justify-between shadow-2xl transition-all duration-500`}
        style={{ 
          background: isLight 
            ? `radial-gradient(circle at top left, ${cert.accent}10 0%, #ffffff 70%)`
            : `radial-gradient(circle at top left, ${cert.accent}15 0%, #0a0a0f 60%)`,
          backgroundColor: isLight ? '#ffffff' : '#0a0a0f'
        }}
      >
        
        {/* Dynamic Stylized Background Pattern */}
        <div className={`absolute inset-0 ${isLight ? 'opacity-30' : 'opacity-10'} pointer-events-none transition-transform duration-1000 group-hover:scale-110`}>
          <div className="absolute inset-0" style={{ backgroundImage: getPattern(), backgroundSize: cert.pattern === 'waves' ? '100% 20px' : 'auto' }}></div>
          <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${isLight ? 'from-gray-100' : 'from-white'} to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] opacity-5`}></div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start z-10">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${cert.color} shadow-lg ${isLight ? 'shadow-gray-200' : 'shadow-black/40'}`}>
              <cert.icon size={24} className="text-white" />
            </div>
            <div>
              <h4 className={`text-[10px] font-mono tracking-[0.3em] uppercase ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>Professional Series</h4>
              <p className={`text-xs font-mono ${isLight ? 'text-gray-600' : 'text-white/80'}`}>Ref: {cert.id}</p>
            </div>
          </div>
          <Award size={32} className={`${isLight ? 'text-gray-200' : 'text-white/10'} group-hover:text-cyan-accent/20 transition-colors`} />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center space-y-4 z-10">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isUnlocked ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className={`w-16 h-px ${isLight ? 'bg-gray-200' : 'bg-gradient-to-r from-transparent via-gray-600 to-transparent'}`} 
          />
          <p className={`text-[10px] font-mono uppercase tracking-[0.5em] ${isLight ? 'text-gray-400' : 'text-gray-400'}`}>This certifies that</p>
          <h2 className={`text-4xl md:text-5xl font-extrabold font-syne tracking-tight ${isLight ? 'text-gray-900' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400'}`}>
            Sham B
          </h2>
          <p className={`text-[10px] font-mono uppercase tracking-[0.2em] ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>has successfully mastered the concepts of</p>
          <div className="relative">
            <h3 className={`text-xl md:text-2xl font-bold font-grotesk ${isLight ? 'text-gray-800' : 'text-white'} group-hover:text-cyan-accent transition-colors duration-500`}>
              {cert.title}
            </h3>
            <div className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r ${cert.color} opacity-30`}></div>
          </div>
          <p className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'} font-light max-w-md italic`}>
            "{cert.topic}"
          </p>
        </div>

        {/* Footer with Signature and Date */}
        <div className="flex justify-between items-end z-10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full border ${isLight ? 'border-gray-100' : 'border-white/5'} flex items-center justify-center ${isLight ? 'bg-gray-50' : 'bg-white/[0.02]'}`}>
              <Fingerprint size={24} className={`${isLight ? 'text-gray-300' : 'text-gray-600'}`} />
            </div>
            <div className="text-left">
              <p className={`text-[8px] font-mono uppercase ${isLight ? 'text-gray-400' : 'text-gray-600'}`}>Verified Identity</p>
              <p className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Digital Signature Active</p>
            </div>
          </div>

          {/* Signature Area */}
          <div className="flex flex-col items-center">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isUnlocked ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className={`text-2xl font-serif italic ${isLight ? 'text-gray-900' : 'text-white'} mb-0 translate-y-2 select-none`}
              style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}
            >
              {cert.signatory.name}
            </motion.p>
            <div className={`w-32 h-[1px] ${isLight ? 'bg-gray-300' : 'bg-white/20'}`} />
            <p className={`text-[8px] font-mono uppercase ${isLight ? 'text-gray-500' : 'text-gray-500'} mt-1`}>{cert.signatory.title}</p>
          </div>
          
          <div className="text-right">
            <p className={`text-[8px] font-mono uppercase ${isLight ? 'text-gray-400' : 'text-gray-600'} tracking-widest mb-1`}>Authenticated</p>
            <div className="flex items-center gap-1 justify-end">
              <span className={`text-xs font-mono ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{cert.date}</span>
              <ShieldCheck size={14} className="text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Holographic Seal Overlay */}
        <div className={`absolute -bottom-12 -right-12 w-48 h-48 rounded-full border ${isLight ? 'border-gray-200' : 'border-white/5'} bg-gradient-to-br ${isLight ? 'from-gray-50' : 'from-white/[0.02]'} to-transparent pointer-events-none group-hover:rotate-45 transition-transform duration-1000`}></div>
      </div>
    </motion.div>
  );
};

export default function Certifications() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="relative min-h-[calc(100vh-80px)] py-20 px-4 md:px-8 flex flex-col items-center"
    >
      <GradientBlur />
      
      <div className="max-w-7xl mx-auto w-full z-10 space-y-16 flex flex-col items-center">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-accent font-mono tracking-[0.4em] uppercase text-xs"
          >
            ⟨ encrypted / storage ⟩
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-6xl font-bold font-grotesk text-white"
          >
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent to-purple-accent">Certificates</span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-accent to-purple-accent mx-auto rounded-full" />
        </div>

        {/* Holographic Touch Area */}
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="hologram"
              initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 2, filter: 'brightness(2) blur(20px)' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => setIsUnlocked(true)}
              className="relative cursor-pointer group py-20"
            >
              {/* Spinning Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-cyan-accent/20 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border border-purple-accent/10 rounded-full"
              />

              {/* Central Seal */}
              <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-cyan-accent/10 to-purple-accent/10 backdrop-blur-3xl border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,0.2)] group-hover:shadow-[0_0_80px_rgba(0,229,255,0.4)] transition-all duration-500">
                <motion.div
                  animate={{ 
                    scale: isHovering ? 1.1 : 1,
                    opacity: isHovering ? 1 : 0.7
                  }}
                  className="flex flex-col items-center"
                >
                  <Scan size={64} className="text-cyan-accent mb-4 animate-pulse" />
                  <p className="text-[10px] font-mono text-cyan-accent tracking-[0.3em] uppercase">Touch to Decrypt</p>
                </motion.div>
                
                {/* Floating Particles Around Seal */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -20, 0],
                      x: [0, Math.sin(i) * 20, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2 + i, 
                      repeat: Infinity,
                      delay: i * 0.5 
                    }}
                    className="absolute w-1 h-1 bg-cyan-accent rounded-full"
                    style={{ 
                      top: '50%', 
                      left: '50%',
                      transform: `rotate(${i * 60}deg) translate(80px)`
                    }}
                  />
                ))}
              </div>
              
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full text-center">
                <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                  <Lock size={12} /> Biometric Authentication Required
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="certs-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full space-y-16"
            >
              <div className="text-center">
                <p className="text-emerald-500 font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 mb-8">
                  <Unlock size={12} /> Decryption Complete. Certificates Unlocked for Sham B.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 place-items-center">
                {certificates.map((cert) => (
                  <CertificateCard key={cert.id} cert={cert} isUnlocked={isUnlocked} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Note */}
        <motion.div 
          animate={{ opacity: isUnlocked ? 1 : 0.3 }}
          className="text-center pt-10"
        >
          <p className="text-gray-600 font-mono text-[10px] tracking-widest uppercase">
            All certifications are digitally signed and immutable.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
