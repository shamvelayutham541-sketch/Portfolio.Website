import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Data ─────────────────────────────────────────────────── */
const techSkills = [
  { name: 'Python',      level: 90, icon: '🐍', color: '#00e5ff' },
  { name: 'C++',         level: 82, icon: '⚙️', color: '#38bdf8' },
  { name: 'JavaScript',  level: 80, icon: '⚡', color: '#facc15' },
  { name: 'HTML / CSS',  level: 95, icon: '🌐', color: '#f97316' },
  { name: 'SQL',         level: 72, icon: '🗄️', color: '#a78bfa' },
  { name: 'Git',         level: 78, icon: '🔀', color: '#34d399' },
  { name: 'React',       level: 76, icon: '⚛️', color: '#61dafb' },
];

const softSkills = [
  { name: 'Creativity',       value: 92, color: '#00e5ff', trail: '#003d4d' },
  { name: 'Problem Solving',  value: 88, color: '#38bdf8', trail: '#0c2a3a' },
  { name: 'Teamwork',         value: 85, color: '#7c3aed', trail: '#1e1040' },
  { name: 'Communication',    value: 80, color: '#a78bfa', trail: '#1a1040' },
];

/* ─── Plexus Canvas Background ─────────────────────────────── */
function PlexusBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const N = 80;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));

    const MAX_DIST = 160;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* update positions */
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      /* edges */
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      /* nodes */
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.7)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00e5ff';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.45 }}
    />
  );
}

/* ─── Tech Skill Card ───────────────────────────────────────── */
function TechCard({ skill, index }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'rgba(0, 229, 255, 0.06)'
          : 'rgba(15, 31, 61, 0.55)',
        borderColor: hovered ? skill.color : 'rgba(0,229,255,0.15)',
        boxShadow:   hovered
          ? `0 0 28px ${skill.color}33, 0 4px 30px rgba(0,0,0,0.5)`
          : '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'all 0.35s ease',
      }}
      className="relative rounded-2xl border backdrop-blur-xl p-5 cursor-pointer overflow-hidden"
    >
      {/* glow top strip */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-all duration-300"
        style={{ background: hovered ? skill.color : 'transparent', boxShadow: hovered ? `0 0 12px ${skill.color}` : 'none' }}
      />

      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{skill.icon}</span>
        <span
          className="text-base font-bold font-mono tracking-wider"
          style={{ color: hovered ? skill.color : '#e2e8f0' }}
        >
          {skill.name}
        </span>
        <span className="ml-auto text-xs font-mono" style={{ color: skill.color }}>
          {skill.level}%
        </span>
      </div>

      {/* track */}
      <div className="relative h-[6px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.4, delay: 0.3 + index * 0.08, ease: [0.34, 1.2, 0.64, 1] }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, #0ea5e9, ${skill.color})`,
            boxShadow:  `0 0 10px ${skill.color}99`,
          }}
        />
        {/* shimmer */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={inView ? { x: '400%' } : {}}
          transition={{ duration: 1.8, delay: 0.5 + index * 0.08, ease: 'easeInOut' }}
          className="absolute inset-y-0 w-12 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)' }}
        />
      </div>

      {/* level label ticks */}
      <div className="flex justify-between mt-1.5">
        {[0, 25, 50, 75, 100].map(tick => (
          <span key={tick} className="text-[9px] font-mono" style={{ color: 'rgba(0,229,255,0.3)' }}>{tick}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Radial Chart ──────────────────────────────────────────── */
function RadialChart({ skill, index }) {
  const ref    = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);
  const [hovered, setHovered] = useState(false);

  const R   = 54;
  const CIR = 2 * Math.PI * R;

  /* animated counter */
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(skill.value / 55);
    const id = setInterval(() => {
      start += step;
      if (start >= skill.value) { setCount(skill.value); clearInterval(id); }
      else setCount(start);
    }, 18);
    return () => clearInterval(id);
  }, [inView, skill.value]);

  const dashOffset = inView ? CIR * (1 - skill.value / 100) : CIR;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.34, 1.3, 0.64, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'rgba(0, 229, 255, 0.05)'
          : 'rgba(15, 31, 61, 0.55)',
        borderColor: hovered ? skill.color : 'rgba(0,229,255,0.12)',
        boxShadow:   hovered
          ? `0 0 36px ${skill.color}44, 0 8px 40px rgba(0,0,0,0.5)`
          : '0 6px 24px rgba(0,0,0,0.4)',
        transition: 'all 0.35s ease',
      }}
      className="relative flex flex-col items-center justify-center rounded-3xl border backdrop-blur-xl p-8 gap-4 cursor-pointer"
    >
      {/* top glow line */}
      <div
        className="absolute top-0 left-1/4 right-1/4 h-[1.5px] rounded-full transition-all duration-300"
        style={{ background: hovered ? skill.color : 'transparent', boxShadow: hovered ? `0 0 14px ${skill.color}` : 'none' }}
      />

      {/* SVG ring */}
      <div className="relative" style={{ width: 140, height: 140 }}>
        <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
          {/* background ring */}
          <circle cx="70" cy="70" r={R} fill="none" strokeWidth="10" stroke={skill.trail} />
          {/* progress arc */}
          <motion.circle
            cx="70" cy="70" r={R}
            fill="none"
            strokeWidth="10"
            stroke={skill.color}
            strokeLinecap="round"
            strokeDasharray={CIR}
            initial={{ strokeDashoffset: CIR }}
            animate={inView ? { strokeDashoffset: dashOffset } : {}}
            transition={{ duration: 1.6, delay: 0.2 + index * 0.12, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${skill.color})` }}
          />
          {/* outer glow ring */}
          {hovered && (
            <circle
              cx="70" cy="70" r={R + 8}
              fill="none"
              strokeWidth="2"
              stroke={skill.color}
              opacity="0.2"
              style={{ filter: `blur(3px)` }}
            />
          )}
        </svg>

        {/* center percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-bold font-mono leading-none"
            style={{ color: skill.color, textShadow: `0 0 20px ${skill.color}` }}
          >
            {count}
          </span>
          <span className="text-xs font-mono mt-0.5" style={{ color: 'rgba(0,229,255,0.5)' }}>%</span>
        </div>
      </div>

      {/* label */}
      <div className="text-center">
        <p className="text-sm font-bold font-mono tracking-widest uppercase" style={{ color: hovered ? skill.color : '#cbd5e1' }}>
          {skill.name}
        </p>
        {/* small dots */}
        <div className="flex justify-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i < Math.round(skill.value / 20) ? skill.color : 'rgba(255,255,255,0.1)',
                boxShadow:  i < Math.round(skill.value / 20) ? `0 0 6px ${skill.color}` : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section Header ────────────────────────────────────────── */
function SectionHeader({ title, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-1">
        <div className="w-1 h-8 rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
        <h3 className="text-xl font-bold font-mono tracking-widest uppercase" style={{ color: accent }}>
          {title}
        </h3>
      </div>
      <div className="ml-4 h-px w-40 rounded-full" style={{ background: `linear-gradient(90deg, ${accent}55, transparent)` }} />
    </motion.div>
  );
}

/* ─── Core Strengths Card ───────────────────────────────────── */
const TAGS = ['Adaptability', 'Fast Learner', 'Leadership', 'Analytical', 'Detail-Oriented', 'Initiative'];

const TAG_COLORS = ['#a78bfa', '#7c3aed', '#818cf8', '#c084fc', '#e879f9', '#a78bfa'];

function StrengthTag({ tag, index, color }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.6 + index * 0.07, ease: [0.34, 1.4, 0.64, 1] }}
      whileTap={{ scale: 0.92 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="px-4 py-1.5 rounded-full text-xs font-mono border cursor-default select-none relative overflow-hidden"
      style={{
        background: hovered ? `${color}22` : 'rgba(124, 58, 237, 0.08)',
        borderColor: hovered ? color : 'rgba(124, 58, 237, 0.3)',
        color: hovered ? '#fff' : color,
        boxShadow: hovered ? `0 0 16px ${color}88, 0 0 6px ${color}44 inset` : 'none',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.25s ease',
      }}
    >
      {/* inner shimmer on hover */}
      {hovered && (
        <motion.span
          className="absolute inset-y-0 w-8 rounded-full"
          initial={{ x: '-100%' }}
          animate={{ x: '300%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
        />
      )}
      {tag}
    </motion.span>
  );
}

function CoreStrengthsCard() {
  const ref    = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-40px' });
  const [angle, setAngle] = useState(0);
  const [scanY, setScanY] = useState(-100);
  const [hovered, setHovered] = useState(false);

  /* rotating border angle */
  useEffect(() => {
    const id = setInterval(() => setAngle(a => (a + 1.2) % 360), 16);
    return () => clearInterval(id);
  }, []);

  /* scan line loop */
  useEffect(() => {
    if (!inView) return;
    let y = -20;
    const id = setInterval(() => {
      y += 1.5;
      if (y > 130) y = -20;
      setScanY(y);
    }, 16);
    return () => clearInterval(id);
  }, [inView]);

  const gradAngle = `${angle}deg`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="mt-6 relative rounded-2xl backdrop-blur-xl p-[2px] overflow-hidden"
      style={{
        background: `conic-gradient(from ${gradAngle}, #7c3aed, #00e5ff, #a78bfa, #7c3aed)`,
        boxShadow: hovered
          ? '0 0 40px #7c3aed55, 0 0 80px #00e5ff22'
          : '0 0 20px #7c3aed33',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* inner container */}
      <div
        className="relative rounded-[14px] p-6 overflow-hidden"
        style={{ background: 'rgba(8, 16, 36, 0.92)' }}
      >
        {/* sweep scan line */}
        <div
          className="absolute left-0 right-0 h-[1.5px] pointer-events-none transition-opacity duration-500"
          style={{
            top: `${scanY}%`,
            background: 'linear-gradient(90deg, transparent, #7c3aed99, #00e5ffcc, #7c3aed99, transparent)',
            boxShadow: '0 0 10px #00e5ff88',
            opacity: inView ? 0.7 : 0,
          }}
        />

        {/* corner accents */}
        {[['top-0 left-0', 'border-t-2 border-l-2 rounded-tl-[14px]'],
          ['top-0 right-0', 'border-t-2 border-r-2 rounded-tr-[14px]'],
          ['bottom-0 left-0', 'border-b-2 border-l-2 rounded-bl-[14px]'],
          ['bottom-0 right-0', 'border-b-2 border-r-2 rounded-br-[14px]'],
        ].map(([pos, cls], i) => (
          <div key={i} className={`absolute ${pos} w-4 h-4 ${cls}`} style={{ borderColor: '#00e5ff', opacity: 0.8 }} />
        ))}

        {/* header */}
        <div className="flex items-center gap-2 mb-4">
          <motion.span
            animate={{ opacity: [1, 0.4, 1], scale: [1, 1.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-base"
            style={{ filter: 'drop-shadow(0 0 6px #a78bfa)' }}
          >
            ◈
          </motion.span>
          <p className="text-xs font-mono tracking-[0.3em] uppercase"
            style={{ color: '#a78bfa', textShadow: '0 0 10px #a78bfa88' }}>
            Core Strengths
          </p>
          {/* live dot */}
          <div className="ml-auto flex items-center gap-1.5">
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#00e5ff', boxShadow: '0 0 6px #00e5ff' }}
            />
            <span className="text-[9px] font-mono text-cyan-accent/50 tracking-widest">LIVE</span>
          </div>
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag, i) => (
            <StrengthTag key={tag} tag={tag} index={i} color={TAG_COLORS[i % TAG_COLORS.length]} />
          ))}
        </div>

        {/* bottom data bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
          className="mt-5 h-[3px] rounded-full origin-left"
          style={{ background: 'linear-gradient(90deg, #7c3aed, #00e5ff, #a78bfa)', boxShadow: '0 0 10px #7c3aed88' }}
        />
        <div className="flex justify-between mt-1">
          <span className="text-[9px] font-mono" style={{ color: 'rgba(0,229,255,0.35)' }}>PROFICIENCY INDEX</span>
          <span className="text-[9px] font-mono" style={{ color: 'rgba(167,139,250,0.5)' }}>v2.4.1</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  in:  { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  out: { opacity: 0, scale: 1.05, transition: { duration: 0.4, ease: 'easeIn' } },
};

export default function Skills() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="relative min-h-[calc(100vh-80px)] flex flex-col py-14 px-4 md:px-8"
      style={{ background: 'transparent' }}
    >
      <PlexusBackground />

      <div className="relative z-10 max-w-7xl mx-auto w-full">

        {/* ── Page Title ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono tracking-[0.4em] uppercase text-cyan-accent/60 mb-3">
            ⟨ capabilities / ⟩
          </p>
          <h2 className="text-5xl md:text-6xl font-bold font-grotesk mb-4 leading-tight">
            My{' '}
            <span
              className="relative inline-block"
              style={{ color: '#00e5ff', textShadow: '0 0 40px #00e5ff88, 0 0 80px #00e5ff44' }}
            >
              Skills
              <span
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, #00e5ff, transparent)' }}
              />
            </span>
          </h2>
          <p className="text-slate-400 font-mono text-sm max-w-md mx-auto">
            Technical proficiency meets creative intelligence — an arsenal forged from passion and practice.
          </p>
        </motion.div>

        {/* ── Two-Column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ── LEFT: Technical Skills ── */}
          <div>
            <SectionHeader title="Technical Skills" accent="#00e5ff" />
            <div className="flex flex-col gap-4">
              {techSkills.map((skill, i) => (
                <TechCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          {/* ── RIGHT: Professional Skills ── */}
          <div>
            <SectionHeader title="Professional Skills" accent="#7c3aed" />
            <div className="grid grid-cols-2 gap-5">
              {softSkills.map((skill, i) => (
                <RadialChart key={skill.name} skill={skill} index={i} />
              ))}
            </div>

            {/* extra info card */}
            <CoreStrengthsCard />
          </div>

        </div>
      </div>
    </motion.div>
  );
}
