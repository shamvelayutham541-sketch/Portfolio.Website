import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';

/* ─── Page transition ──────────────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 40 },
  in:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  out: { opacity: 0, y: -40, transition: { duration: 0.4, ease: 'easeIn' } },
};

/* ─── Category nav ─────────────────────────────────────────── */
const CATS = ['All', 'Product', 'Interacting', 'Web App', 'Certification'];

/* ─── Project data ─────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: 'Neural Interface OS',
    subtitle: 'Product Design',
    category: 'Product',
    image: '/bento_dev_hero.png',
    tags: ['React', 'Three.js', 'WebGL'],
    github: '#',
    demo: '#',
    span: 'col-span-1 md:col-span-2 row-span-2',   // large hero
    overlayPos: 'bottom',
  },
  {
    id: 7,
    title: 'AI Excellence Certificate',
    subtitle: 'Professional Certification',
    category: 'Certification',
    image: '/bento_code_night.png',
    tags: ['LLMs', 'Neural Networks', 'RAG'],
    github: '#',
    demo: '#',
    span: 'col-span-1 row-span-1',
    overlayPos: 'bottom',
    isCertificate: true,
    recipient: 'Sham B',
    field: 'AI Communication & Neural Research'
  },
  {
    id: 2,
    title: 'Holographic Dashboard',
    subtitle: 'Data Visualization',
    category: 'Web App',
    image: '/bento_ui_dashboard.png',
    tags: ['D3.js', 'Vite', 'Tailwind'],
    github: '#',
    demo: '#',
    span: 'col-span-1 row-span-1',
    overlayPos: 'bottom',
  },
  {
    id: 3,
    title: 'Code Flow Studio',
    subtitle: 'Interactive Tool',
    category: 'Interacting',
    image: '/bento_code_night.png',
    tags: ['TypeScript', 'Canvas API'],
    github: '#',
    demo: '#',
    span: 'col-span-1 row-span-1',
    overlayPos: 'bottom',
  },
  {
    id: 4,
    title: 'Graphic Design',
    subtitle: 'Creative Suite',
    category: 'Product',
    image: '/bento_graphic_design.png',
    tags: ['Figma', 'Illustrator', 'Motion'],
    github: '#',
    demo: '#',
    span: 'col-span-1 md:col-span-2 row-span-1',   // wide bottom-left
    overlayPos: 'bottom',
    isGraphicDesign: true,
  },
  {
    id: 5,
    title: 'Particle Engine',
    subtitle: 'Web App',
    category: 'Web App',
    image: '/bento_ui_dashboard.png',
    tags: ['GSAP', 'WebGL'],
    github: '#',
    demo: '#',
    span: 'col-span-1 row-span-1',
    overlayPos: 'bottom',
  },
  {
    id: 6,
    title: 'Motion Library',
    subtitle: 'Interacting',
    category: 'Interacting',
    image: '/bento_code_night.png',
    tags: ['Framer', 'React'],
    github: '#',
    demo: '#',
    span: 'col-span-1 row-span-1',
    overlayPos: 'bottom',
  },
];

/* ─── Neon border helper ───────────────────────────────────── */
function NeonBorder({ color = '#00e5ff', intensity = 1 }) {
  return (
    <>
      {/* top */}
      <span className="absolute top-0 left-[10%] right-[10%] h-[1.5px] rounded-full pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: intensity, boxShadow: `0 0 8px ${color}` }} />
      {/* bottom */}
      <span className="absolute bottom-0 left-[10%] right-[10%] h-[1.5px] rounded-full pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: intensity * 0.5, boxShadow: `0 0 6px ${color}` }} />
      {/* left */}
      <span className="absolute left-0 top-[10%] bottom-[10%] w-[1.5px] rounded-full pointer-events-none"
        style={{ background: `linear-gradient(180deg, transparent, ${color}, transparent)`, opacity: intensity * 0.7, boxShadow: `0 0 6px ${color}` }} />
      {/* right */}
      <span className="absolute right-0 top-[10%] bottom-[10%] w-[1.5px] rounded-full pointer-events-none"
        style={{ background: `linear-gradient(180deg, transparent, ${color}, transparent)`, opacity: intensity * 0.5, boxShadow: `0 0 6px ${color}` }} />
    </>
  );
}

import { Award, ShieldCheck } from 'lucide-react';

/* ─── Single bento card ────────────────────────────────────── */
function BentoCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.34, 1.1, 0.64, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${project.span}`}
      style={{
        background: project.isCertificate 
          ? 'linear-gradient(135deg, rgba(20, 30, 60, 0.9) 0%, rgba(10, 15, 30, 0.95) 100%)'
          : 'rgba(8, 14, 28, 0.85)',
        border: project.isCertificate
          ? '1px solid rgba(255, 215, 0, 0.3)'
          : '1px solid rgba(0, 229, 255, 0.12)',
        boxShadow: hovered
          ? project.isCertificate
            ? '0 0 40px rgba(255,215,0,0.15), 0 0 80px rgba(0,229,255,0.1)'
            : '0 0 40px rgba(0,229,255,0.25), 0 0 80px rgba(0,100,200,0.15), 0 20px 60px rgba(0,0,0,0.6)'
          : '0 8px 32px rgba(0,0,0,0.5)',
        transition: 'all 0.4s ease',
        borderColor: hovered 
          ? project.isCertificate ? 'rgba(255, 215, 0, 0.6)' : 'rgba(0, 229, 255, 0.45)' 
          : project.isCertificate ? 'rgba(255, 215, 0, 0.2)' : 'rgba(0, 229, 255, 0.12)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Background image / Gradient */}
      <div className="absolute inset-0 transition-transform duration-700"
        style={{ transform: hovered ? 'scale(1.08)' : 'scale(1.0)' }}>
        {project.isCertificate ? (
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.05)_0%,_transparent_70%)]" />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ opacity: hovered ? 0.65 : 0.45, transition: 'opacity 0.5s ease' }}
          />
        )}
      </div>

      {/* Certificate Specific Content */}
      {project.isCertificate && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          <motion.div
            animate={hovered ? { rotateY: 360 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="mb-4 p-4 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 shadow-[0_0_20px_rgba(255,215,0,0.2)]"
          >
            <Award size={48} className="text-yellow-500" />
          </motion.div>
          
          <h4 className="text-xs font-mono tracking-[0.3em] uppercase text-yellow-500/80 mb-2">Certificate of Excellence</h4>
          <div className="w-12 h-px bg-yellow-500/30 mb-4" />
          
          <p className="text-gray-400 text-[10px] font-mono mb-1 uppercase tracking-widest">This certifies that</p>
          <h2 className="text-2xl font-bold font-grotesk text-white mb-1 tracking-tight">
            {project.recipient}
          </h2>
          <p className="text-gray-400 text-[10px] font-mono mb-4 uppercase tracking-widest italic">has successfully demonstrated mastery in</p>
          
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <p className="text-cyan-accent font-bold font-grotesk text-sm tracking-wide">
              {project.field}
            </p>
          </div>
          
          <div className="absolute bottom-4 right-4 opacity-20">
            <ShieldCheck size={40} className="text-yellow-500" />
          </div>
        </div>
      )}

      {/* Deep gradient overlay */}
      {!project.isCertificate && (
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(0,14,30,0.7) 0%, rgba(0,40,80,0.35) 50%, rgba(0,0,0,0.8) 100%)' }} />
      )}

      {/* Hover shimmer sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%', opacity: 0 }}
        animate={hovered ? { x: '200%', opacity: 1 } : { x: '-100%', opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        style={{ background: project.isCertificate 
          ? 'linear-gradient(105deg, transparent 30%, rgba(255,215,0,0.1) 50%, transparent 70%)'
          : 'linear-gradient(105deg, transparent 30%, rgba(0,229,255,0.08) 50%, transparent 70%)' 
        }}
      />

      {/* Neon border effect on hover */}
      {hovered && <NeonBorder color={project.isCertificate ? "#ffd700" : "#00e5ff"} intensity={1} />}

      {/* Corner bracket accents */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 rounded-tl-lg pointer-events-none"
        style={{ borderColor: hovered ? project.isCertificate ? '#ffd700' : '#00e5ff' : 'rgba(0,229,255,0.3)', transition: 'border-color 0.3s' }} />
      <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 rounded-tr-lg pointer-events-none"
        style={{ borderColor: hovered ? project.isCertificate ? '#ffd700' : '#00e5ff' : 'rgba(0,229,255,0.3)', transition: 'border-color 0.3s' }} />

      {/* Category badge */}
      <div className="absolute top-5 left-5 z-10">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border"
          style={{
            background: project.isCertificate ? 'rgba(255, 215, 0, 0.08)' : 'rgba(0, 229, 255, 0.08)',
            borderColor: project.isCertificate ? 'rgba(255, 215, 0, 0.3)' : 'rgba(0, 229, 255, 0.3)',
            color: project.isCertificate ? '#ffd700' : '#00e5ff',
            backdropFilter: 'blur(8px)',
          }}>
          {project.subtitle}
        </span>
      </div>

      {/* Links top-right */}
      {!project.isCertificate && (
        <motion.div
          className="absolute top-5 right-5 z-10 flex gap-2"
          initial={{ opacity: 0, y: -6 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          <a href={project.github} onClick={e => e.stopPropagation()}
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(0,0,0,0.5)', borderColor: 'rgba(0,229,255,0.4)', backdropFilter: 'blur(8px)', color: '#00e5ff' }}>
            <Github size={14} />
          </a>
          <a href={project.demo} onClick={e => e.stopPropagation()}
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(0,229,255,0.12)', borderColor: 'rgba(0,229,255,0.5)', backdropFilter: 'blur(8px)', color: '#00e5ff' }}>
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      )}

      {/* Bottom content */}
      {!project.isCertificate && (
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5"
          style={{ background: 'linear-gradient(0deg, rgba(0,8,20,0.95) 0%, rgba(0,8,20,0.7) 60%, transparent 100%)' }}>

          {project.isGraphicDesign && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-3"
            >
              <h2 className="text-2xl font-bold font-grotesk text-white mb-2 tracking-wide">
                Graphic Design
              </h2>
              <p className="text-gray-300 text-xs font-mono leading-relaxed max-w-sm opacity-80">
                Crafting visual identities that speak before words do. From brand systems to motion graphics —
                every pixel placed with purpose, every color chosen with intent.
              </p>
            </motion.div>
          )}

          <div className="flex items-end justify-between gap-3">
            <div className="flex-1 min-w-0">
              {!project.isGraphicDesign && (
                <h3 className="text-lg font-bold font-grotesk text-white mb-1 truncate"
                  style={{ textShadow: hovered ? '0 0 20px rgba(0,229,255,0.4)' : 'none', transition: 'text-shadow 0.3s' }}>
                  {project.title}
                </h3>
              )}
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
                    className="text-[10px] font-mono px-2 py-0.5 rounded border"
                    style={{
                      background: 'rgba(0,229,255,0.06)',
                      borderColor: 'rgba(0,229,255,0.2)',
                      color: '#7dd3fc',
                    }}>
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.div
              animate={hovered ? { x: 4, y: -4, rotate: 0 } : { x: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border"
              style={{
                background: hovered ? 'rgba(0,229,255,0.15)' : 'rgba(0,229,255,0.05)',
                borderColor: hovered ? 'rgba(0,229,255,0.6)' : 'rgba(0,229,255,0.2)',
                boxShadow: hovered ? '0 0 16px rgba(0,229,255,0.4)' : 'none',
                transition: 'all 0.3s ease',
                color: '#00e5ff',
              }}>
              <ExternalLink size={15} />
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main Page ────────────────────────────────────────────── */
export default function Projects() {
  const [activecat, setActiveCat] = useState('All');

  const filtered = activecat === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activecat);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="relative min-h-[calc(100vh-80px)] py-14 px-4 md:px-8"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-7xl mx-auto w-full">

        {/* ── Title ── */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-mono tracking-[0.4em] uppercase mb-3"
            style={{ color: 'rgba(0,229,255,0.5)' }}>
            ⟨ portfolio / ⟩
          </p>
          <h2 className="text-5xl md:text-6xl font-bold font-grotesk mb-4 leading-tight text-white">
            Featured{' '}
            <span style={{ color: '#00e5ff', textShadow: '0 0 40px #00e5ff88, 0 0 80px #00e5ff33' }}>
              Projects
            </span>
          </h2>
          <p className="text-slate-400 font-mono text-sm max-w-md mx-auto">
            A curated collection of products, interactions, and web experiences built with obsessive craft.
          </p>
        </motion.div>

        {/* ── Category Nav ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-10 flex-wrap"
        >
          {CATS.map(cat => {
            const active = activecat === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className="relative px-5 py-2 rounded-full text-sm font-mono tracking-wider transition-all duration-300 overflow-hidden"
                style={{
                  background: active ? 'rgba(0,229,255,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${active ? 'rgba(0,229,255,0.6)' : 'rgba(255,255,255,0.1)'}`,
                  color: active ? '#00e5ff' : '#94a3b8',
                  boxShadow: active ? '0 0 20px rgba(0,229,255,0.25), 0 0 6px rgba(0,229,255,0.15) inset' : 'none',
                  textShadow: active ? '0 0 12px rgba(0,229,255,0.6)' : 'none',
                }}
              >
                {active && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(0,229,255,0.06)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Bento Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activecat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] gap-4"
          >
            {filtered.map((project, i) => (
              <BentoCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3 rounded-full font-mono text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(0,229,255,0.08)',
              border: '1px solid rgba(0,229,255,0.35)',
              color: '#00e5ff',
              boxShadow: '0 0 24px rgba(0,229,255,0.15)',
            }}
          >
            <Github size={16} />
            View All on GitHub
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
