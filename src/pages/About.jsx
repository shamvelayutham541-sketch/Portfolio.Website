import { motion } from 'framer-motion';
import GradientBlur from '../components/GradientBlur';

const pageVariants = {
  initial: { opacity: 0, x: 100, scale: 0.95 },
  in: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  out: { opacity: 0, x: -100, scale: 0.95, transition: { duration: 0.5, ease: "easeIn" } }
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
        {/* Text Content - Left Side */}
        <div className="order-2 lg:order-1 space-y-8 z-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-7xl font-bold font-grotesk mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  About
                </span>
                <span className="text-white ml-2">Me</span>
              </h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-16 bg-gradient-to-r from-cyan-accent to-purple-accent rounded-full" />
                <div className="h-1 w-8 bg-gradient-to-r from-purple-accent to-pink-500 rounded-full" />
                <div className="h-1 w-4 bg-gradient-to-r from-pink-500 to-cyan-accent rounded-full" />
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-300 text-lg leading-relaxed font-light"
            >
              I'm <span className="text-cyan-accent font-semibold">Sham</span>, a passionate first-year <span className="text-purple-accent font-semibold">Artificial Intelligence & Data Science</span> student at Rathinam Technical Campus, Coimbatore — curious builder who loves exploring the intersection of design and technology.
            </motion.p>
            <br />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-300 text-lg leading-relaxed font-light"
            >
              My journey started with a fascination for how things work on the internet, which quickly evolved into a drive to build <span className="text-pink-400 font-semibold">beautiful, highly interactive</span> web experiences. I'm constantly learning new frameworks and tools to push the boundaries of what's possible on the web.
            </motion.p>
            <br />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-gray-300 text-lg leading-relaxed font-light"
            >
              When I'm not in class, you'll find me experimenting with animations, diving into new tech stacks, or asking myself — <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">"What can I build next?"</span>
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 p-6 rounded-2xl text-center backdrop-blur-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative z-10">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent font-mono mb-2 group-hover:scale-110 transition-transform duration-300">1st</h3>
                <p className="text-xs text-cyan-300/80 uppercase tracking-widest font-semibold">Year AI&DS</p>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6 rounded-2xl text-center backdrop-blur-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative z-10">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-mono mb-2 group-hover:scale-110 transition-transform duration-300">10+</h3>
                <p className="text-xs text-purple-300/80 uppercase tracking-widest font-semibold">Skills in Progress</p>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-br from-pink-500/10 to-cyan-500/10 border border-pink-500/20 p-6 rounded-2xl text-center backdrop-blur-xl overflow-hidden col-span-2 md:col-span-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent font-mono mb-2 mt-1 group-hover:scale-110 transition-transform duration-300">CBE</h3>
                <p className="text-xs text-pink-300/80 uppercase tracking-widest mt-2 font-semibold">Location</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Image Box - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="order-1 lg:order-2 flex flex-col gap-6"
        >
          {/* Main Photo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative p-1 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl">
              <img
                src={`${import.meta.env.BASE_URL}photos/sham_about.jpg`}
                alt="Sham - About Me"
                className="w-full h-[450px] lg:h-[550px] object-cover object-top rounded-[20px]"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
