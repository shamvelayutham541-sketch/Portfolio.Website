import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import GradientBlur from '../components/GradientBlur';

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  in: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  out: { opacity: 0, x: -100, transition: { duration: 0.5, ease: "easeIn" } }
};

export default function About() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="relative min-h-[calc(100vh-80px)] flex items-center py-12 px-4"
    >
      <GradientBlur />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* 3D Avatar/Card */}
        <div className="order-2 lg:order-1 h-[400px] lg:h-[500px] w-full relative z-10 border border-white/10 rounded-2xl bg-surface/30 backdrop-blur-sm overflow-hidden">
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Box args={[2, 2, 2]} rotation={[0.5, 0.5, 0]}>
              <meshStandardMaterial color="#7c3aed" wireframe />
            </Box>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </div>

        {/* Text Content */}
        <div className="order-1 lg:order-2 space-y-8 z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-grotesk mb-4 text-white">
              About <span className="text-cyan-accent">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-accent to-purple-accent rounded-full mb-6"></div>
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              I'm Sham, a passionate first-year Artificial Intelligence & Data Science student at Rathinam Technical Campus, Coimbatore — curious builder who loves exploring the intersection of design and technology.
            </p>
            <br />
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              My journey started with a fascination for how things work on the internet, which quickly evolved into a drive to build beautiful, highly interactive web experiences. I'm constantly learning new frameworks and tools to push the boundaries of what's possible on the web.
            </p>
            <br />
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              When I'm not in class, you'll find me experimenting with animations, diving into new tech stacks, or asking myself — "What can I build next?"
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -5 }} className="bg-surface/50 border border-white/10 p-4 rounded-xl text-center backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-cyan-accent font-mono mb-1">1st</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest">Year AI&DS</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-surface/50 border border-white/10 p-4 rounded-xl text-center backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-purple-accent font-mono mb-1">10+</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest">Skills in Progress</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-surface/50 border border-white/10 p-4 rounded-xl text-center backdrop-blur-sm col-span-2 md:col-span-1">
              <h3 className="text-xl font-bold text-white font-mono mb-1 mt-1">CBE</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">Location</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
