import { motion } from 'framer-motion';

export default function GradientBlur() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan-accent/20 blur-[100px] md:blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 150, -50, 0],
          scale: [1, 1.5, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-accent/20 blur-[100px] md:blur-[120px]"
      />
    </div>
  );
}
