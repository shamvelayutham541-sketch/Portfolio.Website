import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TorusKnot } from '@react-three/drei';
import GradientBlur from '../components/GradientBlur';
import { Code2, Terminal, Code, Cpu, Database } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, rotate: -10, scale: 0.9 },
  in: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  out: { opacity: 0, rotate: 10, scale: 1.1, transition: { duration: 0.5, ease: "easeIn" } }
};

const profiles = [
  { platform: 'LeetCode', username: 'sham_codes', icon: Code2, color: 'text-yellow-400', link: '#' },
  { platform: 'HackerRank', username: 'sham_codes', icon: Terminal, color: 'text-green-400', link: '#' },
  { platform: 'CodeChef', username: 'sham_codes', icon: Code, color: 'text-orange-400', link: '#' },
  { platform: 'Codeforces', username: 'sham_codes', icon: Cpu, color: 'text-blue-400', link: '#' },
  { platform: 'GeeksforGeeks', username: 'sham_codes', icon: Database, color: 'text-green-500', link: '#' },
];

export default function Profiles() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="relative min-h-[calc(100vh-80px)] flex flex-col items-center py-12 px-4"
    >
      <GradientBlur />
      
      <div className="max-w-7xl mx-auto w-full z-10 space-y-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-grotesk mb-4 text-white">
            Coding <span className="text-purple-accent">Profiles</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-accent to-cyan-accent rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="h-[400px] w-full relative border border-white/10 rounded-2xl bg-surface/30 backdrop-blur-sm overflow-hidden order-2 lg:order-1">
            <Canvas camera={{ position: [0, 0, 8] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <TorusKnot args={[2, 0.5, 128, 32]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#00e5ff" wireframe />
              </TorusKnot>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-1 lg:order-2">
            {profiles.map((profile, index) => (
              <motion.a
                href={profile.link}
                key={profile.platform}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-surface/50 border border-white/10 rounded-xl p-6 flex items-center space-x-4 hover:border-cyan-accent/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all group"
              >
                <div className={`p-3 rounded-lg bg-surface ${profile.color} group-hover:animate-pulse`}>
                  <profile.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-mono text-white">{profile.platform}</h3>
                  <p className="text-sm text-gray-400">@{profile.username}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
