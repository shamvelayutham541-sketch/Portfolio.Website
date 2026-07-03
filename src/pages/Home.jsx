import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import ParticleBackground from '../components/ParticleBackground';
import GradientBlur from '../components/GradientBlur';
import { Link } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import { useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
  out: { opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeIn" } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const InteractiveText = ({ text }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Tilt options={{ max: 15, scale: 1.05, speed: 400, glare: true, 'max-glare': 0.5 }}>
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className="relative overflow-visible rounded-2xl bg-surface/30 backdrop-blur-md border border-white/10 p-6 md:p-8 cursor-crosshair group shadow-2xl w-fit"
      >
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl overflow-hidden"
          style={{
            opacity,
            background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(0, 229, 255, 0.4), transparent 40%)`,
          }}
        />
        {/* Depth shadow layer */}
        <h1 className="absolute inset-0 p-6 md:p-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-700 text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight sm:tracking-normal blur-[1px] translate-y-1 translate-x-1 z-0 font-syncopate whitespace-nowrap opacity-50">
          {text}
        </h1>
        {/* Main glowing text layer */}
        <h1 className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-accent to-purple-accent text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight sm:tracking-normal drop-shadow-[0_0_15px_rgba(0,229,255,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all duration-500 font-syncopate whitespace-nowrap">
          {text}
        </h1>
      </div>
    </Tilt>
  );
};

export default function Home() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4"
    >
      <ParticleBackground />
      <GradientBlur />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div className="space-y-6 z-10">
          <motion.h2 variants={itemVariants} className="text-cyan-accent font-mono tracking-[0.5em] uppercase text-sm mb-4">
            SHAM.
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-400 font-mono text-xs uppercase tracking-[0.3em] mt-8 mb-4">
            Welcome to my profile
          </motion.p>
          
          <motion.div variants={itemVariants} className="mb-6">
            <InteractiveText text="SHAM B" />
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-cyan-accent/80 font-mono text-sm tracking-wide">
            First Year Engineer · Rathinam Technical Campus, Coimbatore
          </motion.p>

          <motion.p variants={itemVariants} className="text-gray-300 text-lg leading-relaxed font-light max-w-lg mt-6">
            A first-year B.Tech student in Artificial Intelligence & Data Science — just getting started, but already curious about how machines learn, data speaks, and AI reshapes the world. Studying at Rathinam Technical Campus, Coimbatore, building a strong foundation in logic, programming, and analytical thinking. Early days, big ambitions.
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/5">
            <div className="space-y-1">
              <p className="text-cyan-accent font-mono text-[10px] uppercase tracking-widest">Major</p>
              <p className="text-white font-medium text-sm">AI & Data Science</p>
            </div>
            <div className="space-y-1">
              <p className="text-cyan-accent font-mono text-[10px] uppercase tracking-widest">Degree</p>
              <p className="text-white font-medium text-sm">B.Tech · Year 1</p>
            </div>
            <div className="space-y-1">
              <p className="text-cyan-accent font-mono text-[10px] uppercase tracking-widest">Institution</p>
              <p className="text-white font-medium text-sm">Rathinam · Coimbatore</p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-8">
            <Link to="/projects" className="px-8 py-3 rounded-full bg-cyan-accent text-background font-bold hover:bg-cyan-accent/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,229,255,0.4)] relative z-50">
              View My Work
            </Link>
            <a href="/resume.pdf" download className="px-8 py-3 rounded-full border border-cyan-accent/50 text-cyan-accent font-bold hover:bg-cyan-accent/10 transition-all hover:scale-105 active:scale-95 relative z-50">
              Download Resume
            </a>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex items-center gap-4 pt-6">
            <a href="https://instagram.com/__.sham__offx.__" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-surface/50 border border-white/5 text-gray-400 hover:text-cyan-accent hover:border-cyan-accent/50 transition-all hover:scale-110">
              <FaInstagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-surface/50 border border-white/5 text-gray-400 hover:text-cyan-accent hover:border-cyan-accent/50 transition-all hover:scale-110">
              <FaTwitter size={20} />
            </a>
            <a href="https://www.linkedin.com/in/sham-b-163b59383" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-surface/50 border border-white/5 text-gray-400 hover:text-cyan-accent hover:border-cyan-accent/50 transition-all hover:scale-110">
              <FaLinkedin size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-surface/50 border border-white/5 text-gray-400 hover:text-cyan-accent hover:border-cyan-accent/50 transition-all hover:scale-110">
              <FaGithub size={20} />
            </a>
            <a href="mailto:shamvelayutham541@gmail.com" className="p-3 rounded-full bg-surface/50 border border-white/5 text-gray-400 hover:text-cyan-accent hover:border-cyan-accent/50 transition-all hover:scale-110">
              <FaEnvelope size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div variants={itemVariants} className="h-[400px] lg:h-[600px] w-full relative z-10 pointer-events-auto">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />
            <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
              <MeshDistortMaterial
                color="#00e5ff"
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.2}
                metalness={0.8}
              />
            </Sphere>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
          </Canvas>
        </motion.div>
      </div>
    </motion.div>
  );
}
