import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="relative flex items-center justify-center">
        {/* S Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold font-grotesk text-white absolute z-10"
        >
          S
        </motion.div>
        
        {/* Orbiting Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full border-t-2 border-r-2 border-cyan-accent absolute"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-40 h-40 rounded-full border-b-2 border-l-2 border-purple-accent absolute opacity-50"
        />
      </div>
    </motion.div>
  );
}
