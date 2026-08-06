import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, Brain, Database, MessageSquare, Fingerprint, Scan, Lock, Unlock, Download, ExternalLink, BarChart3, Code2 } from 'lucide-react';
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
  },
  {
    id: 'AIML-2026-005',
    title: 'Advance Your Skills in AI and Machine Learning',
    topic: 'Neural Networks, Deep Learning, ML Pipelines, and AI Production Workflows',
    icon: Brain,
    color: 'from-orange-500 to-amber-600',
    accent: '#f59e0b',
    date: 'August 05, 2026',
    signatory: { name: 'LinkedIn Learning', title: 'Official Program Certificate' },
    pattern: 'circuit',
    theme: 'dark',
    pdfUrl: `${import.meta.env.BASE_URL}certificates/AI_ML_Advance_Skills_Certificate.pdf`
  },
  {
    id: 'GENAI-2026-006',
    title: 'Building Generative AI Skills for Developers',
    topic: 'LLM Foundations, Prompt Engineering, RAG, Fine-Tuning, and GenAI Application Development',
    icon: Database,
    color: 'from-violet-500 to-fuchsia-600',
    accent: '#a855f7',
    date: 'August 06, 2026',
    signatory: { name: 'LinkedIn Learning', title: 'Official Program Certificate' },
    pattern: 'hexagons',
    theme: 'dark',
    pdfUrl: `${import.meta.env.BASE_URL}certificates/Building_Generative_AI_Skills_Developer_Certificate.pdf`
  },
  {
    id: 'DATA-2026-007',
    title: 'Career Essentials in Data Analysis',
    topic: 'Excel Fundamentals, Power BI Dashboards, SQL Queries, Statistical Analysis, Data Visualization, and Storytelling with Data',
    icon: BarChart3,
    color: 'from-blue-500 to-cyan-600',
    accent: '#06b6d4',
    date: 'August 06, 2026',
    signatory: { name: 'Microsoft & LinkedIn', title: 'Career Essentials Program' },
    pattern: 'grid',
    theme: 'dark',
    pdfUrl: `${import.meta.env.BASE_URL}certificates/Career_Essentials_Data_Analysis_Microsoft_LinkedIn.pdf`
  },
  {
    id: 'MLPY-2026-008',
    title: 'Machine Learning with Python Professional Certificate',
    topic: 'NumPy, Pandas, Matplotlib, Scikit-learn, Supervised & Unsupervised Learning, Regression, Classification, Clustering, and Model Deployment',
    icon: Code2,
    color: 'from-emerald-500 to-teal-600',
    accent: '#10b981',
    date: 'August 06, 2026',
    signatory: { name: 'Anaconda Inc.', title: 'Official Professional Certificate' },
    pattern: 'circuit',
    theme: 'dark',
    pdfUrl: `${import.meta.env.BASE_URL}certificates/ML_Python_Professional_Certificate_Anaconda.pdf`
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

  const renderInnerCard = () => {
    if (cert.pdfUrl) {
      return (
        <div className="relative h-full w-full flex flex-col rounded-2xl overflow-hidden bg-white text-gray-900 border border-gray-200 shadow-xl">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className={`p-1.5 rounded-md bg-gradient-to-br ${cert.color} shrink-0`}>
                <cert.icon size={14} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-500 leading-none">
                  Ref: {cert.id}
                </p>
                <p className="text-[12px] font-bold text-gray-800 truncate leading-tight mt-0.5 max-w-[36ch]">
                  {cert.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={cert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View Certificate PDF"
                className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors duration-200"
              >
                <ExternalLink size={14} />
              </a>
              <a
                href={cert.pdfUrl}
                download
                title="Download Certificate PDF"
                className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:border-emerald-400 hover:text-emerald-500 transition-colors duration-200"
              >
                <Download size={14} />
              </a>
            </div>
          </div>

          <div className="flex-1 w-full bg-white overflow-hidden relative">
            <iframe
              src={cert.pdfUrl}
              title={cert.title}
              className="w-full h-full border-0 block"
              loading="lazy"
            />
          </div>

          <div className="flex items-center justify-between px-4 py-1.5 border-t border-gray-200 bg-gray-50 shrink-0">
            <p className="text-[10px] font-mono text-gray-600 leading-none">
              <span className="text-emerald-600 font-semibold">●</span> {cert.signatory.name} — {cert.signatory.title}
            </p>
            <div className="flex items-center gap-1 text-[10px] font-mono text-gray-600 leading-none">
              <ShieldCheck size={12} className="text-emerald-600" />
              <span>{cert.date}</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`relative h-full w-full rounded-2xl overflow-hidden p-6 flex flex-col justify-between shadow-xl border ${isLight ? 'border-gray-200' : 'border-white/10'}`}
        style={{
          background: isLight
            ? `radial-gradient(circle at top left, ${cert.accent}10 0%, #ffffff 70%)`
            : `radial-gradient(circle at top left, ${cert.accent}15 0%, #0a0a0f 60%)`,
          backgroundColor: isLight ? '#ffffff' : '#0a0a0f',
        }}
      >
        <div className={`absolute inset-0 ${isLight ? 'opacity-30' : 'opacity-10'} pointer-events-none`}>
          <div className="absolute inset-0" style={{ backgroundImage: getPattern(), backgroundSize: cert.pattern === 'waves' ? '100% 20px' : 'auto' }}></div>
          <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${isLight ? 'from-gray-100' : 'from-white'} to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] opacity-5`}></div>
        </div>

        <div className="flex justify-between items-start z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg bg-gradient-to-br ${cert.color} shadow-lg ${isLight ? 'shadow-gray-200' : 'shadow-black/40'}`}>
              <cert.icon size={20} className="text-white" />
            </div>
            <div>
              <h4 className={`text-[10px] font-mono tracking-[0.3em] uppercase ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>Professional Series</h4>
              <p className={`text-xs font-mono ${isLight ? 'text-gray-600' : 'text-white/80'}`}>Ref: {cert.id}</p>
            </div>
          </div>
          <Award size={28} className={isLight ? 'text-gray-200' : 'text-white/10'} />
        </div>

        <div className="flex flex-col items-center text-center space-y-3 z-10">
          <div className={`w-14 h-px ${isLight ? 'bg-gray-200' : 'bg-gradient-to-r from-transparent via-gray-600 to-transparent'}`} />
          <p className={`text-[10px] font-mono uppercase tracking-[0.5em] ${isLight ? 'text-gray-400' : 'text-gray-400'}`}>This certifies that</p>
          <h2 className={`text-3xl font-extrabold tracking-tight ${isLight ? 'text-gray-900' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400'}`}>
            Sham B
          </h2>
          <p className={`text-[10px] font-mono uppercase tracking-[0.2em] ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>has successfully mastered the concepts of</p>
          <div>
            <h3 className={`text-lg md:text-xl font-bold ${isLight ? 'text-gray-800' : 'text-white'}`}>{cert.title}</h3>
          </div>
          <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-gray-400'} font-light max-w-md italic leading-snug`}>
            "{cert.topic}"
          </p>
        </div>

        <div className="flex justify-between items-end z-10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full border ${isLight ? 'border-gray-100' : 'border-white/5'} flex items-center justify-center ${isLight ? 'bg-gray-50' : 'bg-white/[0.02]'}`}>
              <Fingerprint size={20} className={isLight ? 'text-gray-300' : 'text-gray-600'} />
            </div>
            <div className="text-left">
              <p className={`text-[8px] font-mono uppercase ${isLight ? 'text-gray-400' : 'text-gray-600'}`}>Verified Identity</p>
              <p className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Digital Signature Active</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className={`text-xl font-serif italic ${isLight ? 'text-gray-900' : 'text-white'} mb-0 translate-y-2 select-none`}
               style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}>
              {cert.signatory.name}
            </p>
            <div className={`w-28 h-px ${isLight ? 'bg-gray-300' : 'bg-white/20'}`} />
            <p className={`text-[8px] font-mono uppercase ${isLight ? 'text-gray-500' : 'text-gray-500'} mt-1`}>{cert.signatory.title}</p>
          </div>
          <div className="text-right">
            <p className={`text-[8px] font-mono uppercase ${isLight ? 'text-gray-400' : 'text-gray-600'} tracking-widest mb-1`}>Authenticated</p>
            <div className="flex items-center gap-1 justify-end">
              <span className={`text-xs font-mono ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{cert.date}</span>
              <ShieldCheck size={12} className="text-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      variants={certVariants}
      initial="hidden"
      animate={isUnlocked ? "visible" : "hidden"}
      className="relative w-full max-w-2xl aspect-[1.4/1] select-none"
    >
      <div className="absolute -inset-1 bg-gradient-to-r opacity-10 rounded-2xl blur pointer-events-none"></div>
      {renderInnerCard()}
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
