import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaDownload, FaMapMarkerAlt, FaBriefcase, FaBullseye, FaRocket, FaEye, FaChessKnight } from 'react-icons/fa';
import { SiPython } from 'react-icons/si';
import { Trophy, Cpu, ShieldCheck, Code2, User } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ══════════════════════════════════════════════════════════════
   PREMIUM 3D BACKGROUND SCENE
══════════════════════════════════════════════════════════════ */

/* ── 1. Deep star field (3 depth layers) ─────────────────────── */
function StarField({ count = 1800, depth = 1 }) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80 * depth;
      sizes[i] = Math.random() * 1.8 + 0.3;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [count, depth]);

  const mat = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color('#a0d8ef'),
    size: 0.045,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  const ref = useRef();
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.008 * depth; });
  return <points ref={ref} geometry={geo} material={mat} />;
}

/* ── 2. Cyan nebula dust cloud ──────────────────────────────── */
function NebulaDust({ count = 500 }) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 18 + 4;
      const theta = Math.random() * Math.PI * 2;
      const phi   = (Math.random() - 0.5) * Math.PI * 0.5;
      pos[i * 3]     = r * Math.cos(theta) * Math.cos(phi);
      pos[i * 3 + 1] = r * Math.sin(phi) * 3;
      pos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
      // Cyan-to-purple gradient by position
      const t = (pos[i * 3 + 1] + 30) / 60;
      col[i * 3]     = t * 0.5;
      col[i * 3 + 1] = 0.7 + t * 0.3;
      col[i * 3 + 2] = 1.0;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    return g;
  }, [count]);

  const mat = useMemo(() => new THREE.PointsMaterial({
    size: 0.22,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  const ref = useRef();
  useFrame((_, dt) => { if (ref.current) { ref.current.rotation.y += dt * 0.012; ref.current.rotation.x += dt * 0.003; } });
  return <points ref={ref} geometry={geo} material={mat} />;
}

/* ── 3. Glowing aurora rings ────────────────────────────────── */
function AuroraRing({ radius, color, speed, tilt }) {
  const geo = useMemo(() => new THREE.TorusGeometry(radius, 0.018, 2, 200), [radius]);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  }), [color]);
  const ref = useRef();
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.z += dt * speed;
      ref.current.rotation.x += dt * speed * 0.4;
    }
  });
  return (
    <mesh ref={ref} geometry={geo} material={mat}
      rotation={[tilt, 0, 0]}
    />
  );
}

/* ── 4. Floating glowing orbs ───────────────────────────────── */
function GlowOrb({ position, color, size, speed }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + offset;
      ref.current.position.y = position[1] + Math.sin(t) * 0.8;
      ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.5;
    }
  });
  const geo = useMemo(() => new THREE.SphereGeometry(size, 16, 16), [size]);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [color]);
  return <mesh ref={ref} geometry={geo} material={mat} position={position} />;
}

/* ── 5. Rotating cosmic grid plane ─────────────────────────── */
function CosmicGrid() {
  const ref = useRef();
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.x += dt * 0.006; });
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const lines = [];
    const N = 24, SIZE = 30;
    for (let i = -N / 2; i <= N / 2; i++) {
      const t = (i / N) * SIZE;
      lines.push(-SIZE / 2, 0, t,  SIZE / 2, 0, t);
      lines.push(t, 0, -SIZE / 2,  t, 0, SIZE / 2);
    }
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lines), 3));
    return g;
  }, []);
  const mat = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color('#00e5ff'),
    transparent: true,
    opacity: 0.06,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);
  return <lineSegments ref={ref} geometry={geo} material={mat} position={[0, -6, 0]} />;
}

/* ── 6. Mouse-reactive camera drift ────────────────────────── */
function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x * 1.2 - camera.position.x) * 0.035;
    camera.position.y += (-mouse.current.y * 0.7 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Full scene ─────────────────────────────────────────────── */
function PremiumScene() {
  return (
    <>
      <CameraRig />
      {/* Stars — 3 depth layers */}
      <StarField count={1400} depth={1.0} />
      <StarField count={600}  depth={2.2} />
      <StarField count={300}  depth={3.5} />
      {/* Nebula */}
      <NebulaDust count={600} />
      {/* Aurora rings */}
      <AuroraRing radius={14} color="#00e5ff" speed={0.08}  tilt={1.1} />
      <AuroraRing radius={18} color="#7c3aed" speed={0.055} tilt={0.7} />
      <AuroraRing radius={22} color="#00ffaa" speed={0.035} tilt={1.5} />
      <AuroraRing radius={10} color="#ff6ef7" speed={0.12}  tilt={0.4} />
      {/* Glowing orbs */}
      <GlowOrb position={[-6,  2, -8]} color="#00e5ff" size={0.28} speed={0.4} />
      <GlowOrb position={[ 7, -1, -6]} color="#7c3aed" size={0.22} speed={0.3} />
      <GlowOrb position={[ 2,  4, -10]} color="#00ffaa" size={0.18} speed={0.55} />
      <GlowOrb position={[-5, -3, -5]} color="#ff6ef7" size={0.14} speed={0.65} />
      {/* Cosmic grid */}
      <CosmicGrid />
    </>
  );
}

/* ── Canvas wrapper ─────────────────────────────────────────── */
function PremiumBg() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 70 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: 'linear-gradient(135deg,#010610 0%,#050318 50%,#010814 100%)' }}
      >
        <PremiumScene />
      </Canvas>
    </div>
  );
}

/* ─── Animated laser border light ──────────────────────────── */
function GlowBorder({ color = '#00e5ff', duration = 3, borderRadius = 16, opacity = 1 }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10, borderRadius, overflow: 'visible' }}
    >
      <rect
        x="1" y="1"
        width="calc(100% - 2px)" height="calc(100% - 2px)"
        rx={borderRadius} ry={borderRadius}
        fill="none"
        stroke="url(#laser-grad)"
        strokeWidth="1.5"
        style={{ opacity }}
      />
      {/* Static dim border always visible */}
      <rect
        x="1" y="1"
        width="calc(100% - 2px)" height="calc(100% - 2px)"
        rx={borderRadius} ry={borderRadius}
        fill="none"
        stroke={color}
        strokeWidth="1"
        style={{ opacity: 0.12 }}
      />
      <defs>
        <linearGradient id={`laser-grad`} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="45%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="55%" stopColor={color} stopOpacity="0" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            from="-200% 0"
            to="200% 0"
            dur={`${duration}s`}
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── CSS keyframe border sweep (uses conic-gradient trick) ── */
function LaserBorder({ color = '#00e5ff', duration = 2.8, radius = '1rem', size = 2 }) {
  const id = useRef(`lb-${Math.random().toString(36).slice(2)}`).current;
  return (
    <>
      <style>{`
        @keyframes ${id}-spin { from { --${id}-angle: 0deg; } to { --${id}-angle: 360deg; } }
        @property --${id}-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        .${id} {
          --${id}-angle: 0deg;
          animation: ${id}-spin ${duration}s linear infinite;
          position: absolute;
          inset: -${size}px;
          border-radius: calc(${radius} + ${size}px);
          background: conic-gradient(
            from var(--${id}-angle),
            transparent 0deg,
            transparent 300deg,
            ${color}cc 340deg,
            #fff 355deg,
            ${color}cc 360deg,
            transparent 360deg
          );
          z-index: 0;
          pointer-events: none;
        }
        .${id}-mask {
          position: absolute;
          inset: ${size}px;
          border-radius: ${radius};
          background: rgba(8,16,32,0.88);
          z-index: 1;
          pointer-events: none;
        }
      `}</style>
      <div className={id} />
      <div className={`${id}-mask`} />
    </>
  );
}

/* ─── 3D tilt card wrapper ──────────────────────────────────── */
function TiltCard({ children, className = '', intensity = 12 }) {
  const ref = useRef(null);
  const [hovering, setHovering] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 260, damping: 22 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-intensity, intensity]), springConfig);
  const scale   = useSpring(hovering ? 1.04 : 1, springConfig);

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const onLeave = () => { rawX.set(0); rawY.set(0); setHovering(false); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d', transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Floating 3D photo card ────────────────────────────────── */
function PhotoCard({ src, alt, rotate, delay, translateY }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateZ: rotate }}
      animate={{ opacity: 1, y: translateY ?? 0, rotateZ: rotate }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: (translateY ?? 0) - 14, scale: 1.07, rotateZ: 0, transition: { duration: 0.3 } }}
      className="relative shadow-2xl cursor-pointer"
      style={{
        width: 200, height: 320,
        borderRadius: 20,
        transformStyle: 'preserve-3d',
        boxShadow: '0 8px 40px rgba(0,0,0,0.7), 0 0 30px rgba(0,200,255,0.18)',
      }}
    >
      {/* Laser border */}
      <LaserBorder color="#00e5ff" duration={2.5} radius="20px" size={2} />
      {/* Inner content */}
      <div className="absolute inset-[2px] overflow-hidden" style={{ zIndex: 2, borderRadius: 18, background: 'linear-gradient(135deg,#0d1b2a,#0a0f1e)' }}>
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-accent/10 to-purple-accent/10">
            <User size={48} className="text-cyan-accent/30" />
          </div>
        )}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-accent to-transparent opacity-70" />
      </div>
    </motion.div>
  );
}

/* ─── Bento highlight card ──────────────────────────────────── */
function HighlightCard({ icon: Icon, title, subtitle, delay, accent = '#00e5ff' }) {
  return (
    <TiltCard intensity={10}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="relative rounded-xl p-4 flex flex-col gap-2 cursor-default overflow-hidden"
        style={{
          background: 'rgba(8,14,30,0.92)',
          boxShadow: `0 4px 32px rgba(0,0,0,0.6), 0 0 28px ${accent}22`,
          backdropFilter: 'blur(14px)',
        }}
      >
        <LaserBorder color={accent} duration={3.2} radius="12px" size={1.5} />

        {/* Ambient glow blob */}
        <div
          className="absolute -top-4 -right-4 w-20 h-20 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${accent}44 0%, transparent 70%)`,
            zIndex: 1,
            filter: 'blur(10px)',
          }}
        />

        <div className="relative flex items-center gap-3" style={{ zIndex: 3 }}>
          {/* Icon box */}
          <div
            className="p-2.5 rounded-xl shrink-0"
            style={{
              background: `linear-gradient(135deg, ${accent}22, ${accent}08)`,
              border: `1px solid ${accent}33`,
              boxShadow: `0 0 12px ${accent}22`,
            }}
          >
            <Icon size={20} style={{ color: accent, filter: `drop-shadow(0 0 6px ${accent})` }} />
          </div>

          <div>
            {/* Title — Syne bold with accent gradient */}
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: '0.88rem',
                letterSpacing: '0.04em',
                lineHeight: 1.2,
                background: `linear-gradient(120deg, #ffffff 0%, ${accent} 60%, #ffffff 100%)`,
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmerText 4s linear infinite',
              }}
            >
              {title}
            </p>
            {/* Subtitle — mono small caps */}
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: `${accent}99`,
                marginTop: '0.2rem',
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

/* ─── Small tag chip ────────────────────────────────────────── */
function TagChip({ label, sublabel, icon: Icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className="relative flex flex-col items-center justify-center rounded-xl p-3 gap-1 text-center overflow-hidden"
      style={{
        background: 'rgba(10,18,35,0.88)',
        backdropFilter: 'blur(10px)',
        minWidth: 90,
        boxShadow: '0 0 18px rgba(0,200,255,0.08)',
      }}
    >
      <LaserBorder color="#00e5ff" duration={2.6} radius="12px" size={1.5} />
      <span className="relative text-[9px] uppercase tracking-widest font-mono text-cyan-accent/60" style={{ zIndex: 3 }}>{label}</span>
      {Icon && <Icon size={18} className="relative text-cyan-accent" style={{ zIndex: 3 }} />}
      <span className="relative text-white text-xs font-bold leading-tight" style={{ zIndex: 3 }}>{sublabel}</span>
    </motion.div>
  );
}

/* ─── Bio bullet row ────────────────────────────────────────── */
function BulletRow({ icon: Icon, label, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay }}
      className="flex items-start gap-3"
    >
      <span
        className="mt-0.5 shrink-0 flex items-center justify-center rounded-md w-6 h-6"
        style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)' }}
      >
        <Icon size={11} style={{ color: '#00e5ff' }} />
      </span>
      <p className="text-sm leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '0.78rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg, #00e5ff 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginRight: '0.4rem',
          }}
        >
          {label}:
        </span>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300, fontSize: '0.82rem' }}>
          {value}
        </span>
      </p>
    </motion.div>
  );
}

/* ─── Main Home component ───────────────────────────────────── */
export default function Home() {
  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{ background: '#020810' }}
    >
      <PremiumBg />

      {/* Premium bloom overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 1,
        background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(0,180,255,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 75% 60%, rgba(124,58,237,0.08) 0%, transparent 60%)',
      }} />

      {/* ── Hero name + badge — above photos ── */}
      <div className="relative z-20 flex flex-col items-center justify-center pt-32 pb-2 px-4 text-center">
        {/* Big name */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-grotesk font-black uppercase tracking-tight text-white"
          style={{
            fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textShadow: '0 0 40px rgba(0,200,255,0.25), 0 0 80px rgba(0,200,255,0.1)',
          }}
        >
          SHAM{' '}
          <span
            style={{
              WebkitTextStroke: '2px rgba(0,229,255,0.7)',
              color: 'transparent',
              textShadow: 'none',
            }}
          >
            B
          </span>
        </motion.h1>

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 flex items-center gap-2 px-5 py-2 rounded-full"
          style={{
            background: 'rgba(0,40,20,0.85)',
            border: '1px solid rgba(0,255,120,0.3)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 18px rgba(0,255,100,0.15)',
          }}
        >
          {/* Pulsing green dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: '#00ff88' }}
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ background: '#00ff88' }}
            />
          </span>
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: 'rgba(0,255,136,0.9)' }}
          >
            Available for Internships &amp; Collaboration
          </span>
        </motion.div>
      </div>

      {/* ── Top photo strip ── */}
      <div className="relative z-20 flex items-end justify-center gap-6 pt-6 pb-4 px-4" style={{ perspective: 900 }}>
        <PhotoCard src={null} alt="photo 1" rotate={-8}  delay={0.1} translateY={12} />
        <PhotoCard src={null} alt="photo 2" rotate={0}   delay={0.2} translateY={-8} />
        <PhotoCard src={null} alt="photo 3" rotate={7}   delay={0.3} translateY={10} />
      </div>

      {/* ── Main content grid ── */}
      <div className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 md:px-10 lg:px-16 py-6 max-w-7xl mx-auto w-full">

        {/* LEFT — Bio panel */}
        <TiltCard intensity={6} className="h-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl p-7 h-full flex flex-col gap-5 overflow-hidden"
            style={{
              background: 'rgba(8,16,32,0.88)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 40px rgba(0,200,255,0.06)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <LaserBorder color="#00e5ff" duration={4} radius="16px" size={2} />
            {/* Corner dots */}
            {['top-3 left-3','top-3 right-3','bottom-3 left-3','bottom-3 right-3'].map(pos => (
              <span key={pos} className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-cyan-accent/50`} style={{ zIndex: 4 }} />
            ))}

            <div className="relative" style={{ zIndex: 3 }}>
              {/* Premium title */}
              <h2
                className="font-syne font-extrabold leading-tight tracking-tight"
                style={{
                  fontSize: '1.25rem',
                  background: 'linear-gradient(135deg, #ffffff 0%, #a0d8ef 60%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.01em',
                }}
              >
                B.Tech AI &amp; Data Science Student
              </h2>
              {/* Role — animated shimmer */}
              <p
                className="font-syne font-bold text-lg mt-1 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #00e5ff 0%, #ffffff 40%, #00e5ff 80%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmerText 3s linear infinite',
                }}
              >
                AI Engineer
              </p>
              <div className="w-20 h-[1.5px] mt-2 rounded-full bg-gradient-to-r from-cyan-accent via-purple-accent to-transparent" />
              <style>{`
                @keyframes shimmerText {
                  0%   { background-position: 200% center; }
                  100% { background-position: -200% center; }
                }
              `}</style>
            </div>

            <div className="relative flex flex-col gap-3" style={{ zIndex: 3 }}>
              <BulletRow icon={FaMapMarkerAlt} label="Location"       value="Coimbatore, Tamil Nadu, India"        delay={0.15} />
              <BulletRow icon={FaBriefcase}    label="Availability"   value="Open for Remote & Coimbatore Internships" delay={0.2} />
              <BulletRow icon={FaBullseye}     label="Objective"      value="Ambitious first-year student actively building AI systems." delay={0.25} />
              <BulletRow icon={Cpu}            label="Specialization" value="Bridging advanced machine learning and full-stack development." delay={0.3} />
              <BulletRow icon={FaRocket}       label="Execution"      value="Engineering autonomous agents and analytical pipelines." delay={0.35} />
              <BulletRow icon={FaEye}          label="Vision"         value="Delivering high-impact, production-ready solutions at scale." delay={0.4} />
            </div>

            {/* CTA buttons */}
            <div className="relative flex flex-wrap gap-3 pt-2" style={{ zIndex: 3 }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(0,229,255,0.6)' }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-black cursor-pointer border-none"
                style={{
                  background: 'linear-gradient(135deg,#00e5ff,#0099cc)',
                  fontFamily: "'Syne', sans-serif",
                  letterSpacing: '0.04em',
                }}
              >
                About Me
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: 'rgba(0,229,255,0.5)', boxShadow: '0 0 16px rgba(0,229,255,0.15)' }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  fontFamily: "'Syne', sans-serif",
                  letterSpacing: '0.04em',
                }}
              >
                Hire Me
              </motion.button>
              <motion.a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                download
                whileHover={{ scale: 1.05, borderColor: 'rgba(124,58,237,0.5)', boxShadow: '0 0 16px rgba(124,58,237,0.15)' }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  fontFamily: "'Syne', sans-serif",
                  letterSpacing: '0.04em',
                }}
              >
                <FaDownload size={11} /> Resume
              </motion.a>
            </div>

            {/* Socials */}
            <div className="relative flex items-center gap-4 pt-1" style={{ zIndex: 3 }}>
              {[
                { href: 'https://www.linkedin.com/in/sham-b-163b59383', Icon: FaLinkedin },
                { href: 'https://github.com/shamvelayutham541-sketch',   Icon: FaGithub },
                { href: 'https://instagram.com/__.sham__offx.__',        Icon: FaInstagram },
              ].map(({ href, Icon }) => (
                <motion.a
                  key={href} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.25, color: '#00e5ff' }}
                  className="text-white/40 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </TiltCard>

        {/* RIGHT — Bento grid */}
        <div className="flex flex-col gap-4">

          {/* Row 1 — two highlight cards */}
          <div className="grid grid-cols-2 gap-4">
            <HighlightCard icon={Trophy}     title="Hackathon Finalist"  subtitle="Meta PyTorch (OpenEnv)" delay={0.2} accent="#00e5ff" />
            <HighlightCard icon={FaChessKnight} title="Production Ready" subtitle="3+ Live Architectures"  delay={0.25} accent="#a78bfa" />
          </div>

          {/* Row 2 — wide certified card */}
          <HighlightCard icon={ShieldCheck} title="Certified Expert" subtitle="15+ Professional Certifications" delay={0.3} accent="#34d399" />

          {/* Row 3 — three tag chips */}
          <div className="grid grid-cols-3 gap-3">
            <TagChip label="Focus"          sublabel="AI Automation"  icon={Cpu}   delay={0.35} />
            <TagChip label="Specialization" sublabel="Prompt Eng"     icon={Code2} delay={0.4}  />
            <TagChip label="Top Skills"     sublabel="Python, React"  icon={SiPython} delay={0.45} />
          </div>

          {/* Row 4 — name + title card with 3D glow */}
          <TiltCard intensity={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative rounded-xl p-5 overflow-hidden"
              style={{
                background: 'rgba(8,16,32,0.88)',
                boxShadow: '0 0 30px rgba(0,200,255,0.1)',
                backdropFilter: 'blur(14px)',
              }}
            >
              <LaserBorder color="#7c3aed" duration={3.5} radius="12px" size={2} />
              {/* Animated glow orb */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, #00e5ff 0%, transparent 70%)', zIndex: 2 }}
              />
              <p className="relative text-white/40 font-mono text-[10px] uppercase tracking-widest mb-1" style={{ zIndex: 3 }}>Currently</p>
              <h1 className="relative text-white font-bold text-2xl tracking-tight" style={{ zIndex: 3 }}>
                SHAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent to-purple-accent">B.</span>
              </h1>
              <p className="relative text-cyan-accent/80 font-mono text-xs tracking-widest uppercase mt-1" style={{ zIndex: 3 }}>
                First Year · AI &amp; Data Science · Rathinam, CBE
              </p>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
}
