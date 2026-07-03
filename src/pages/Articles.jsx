import { motion } from 'framer-motion';
import GradientBlur from '../components/GradientBlur';
import { ArrowUpRight, Clock, BookOpen, Sparkles } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeIn" } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 }
};

const featuredArticle = {
  title: 'The quiet revolution inside every LLM',
  quote: "Attention mechanisms don't just predict words — they model relationships. That's a subtle but world-changing distinction.",
  description: 'A deep architectural walk through how transformers, tokens, and self-attention conspire to produce language that feels almost human.',
  tag: 'Deep dive',
  time: '10 min',
  link: '#'
};

const trendingArticles = [
  {
    title: 'Prompting is the new literacy',
    description: "The people who will thrive in an AI-native world aren't coders or CEOs — they're the ones who learned to ask better questions.",
    tag: 'Opinion',
    time: '6 min',
    link: '#'
  },
  {
    title: 'What RAG actually solves (and what it doesn\'t)',
    description: "Retrieval-augmented generation isn't magic. Here's a clear-eyed look at where it shines and where it falls short.",
    tag: 'Explainer',
    time: '7 min',
    link: '#'
  },
  {
    title: 'AGI isn\'t coming for your job — mediocrity is',
    description: "The real threat isn't superintelligence. It's complacency in a world where AI raises the floor for everyone.",
    tag: 'Future',
    time: '5 min',
    link: '#'
  },
  {
    title: 'Who gets to decide what AI values?',
    description: "Alignment isn't just a technical problem. It's a political, philosophical, and deeply human one — and we're all stakeholders.",
    tag: 'Ethics',
    time: '8 min',
    link: '#'
  }
];

export default function Articles() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="relative min-h-[calc(100vh-80px)] flex flex-col items-center py-16 px-4 md:px-8"
    >
      <GradientBlur />
      
      <div className="max-w-6xl mx-auto w-full z-10 space-y-20">
        {/* Header Section */}
        <div className="max-w-3xl">
          <motion.p variants={itemVariants} className="text-cyan-accent font-mono tracking-[0.3em] uppercase text-xs mb-4">
            ⟨ thoughts & perspectives / ⟩
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold font-grotesk text-white mb-6 leading-tight">
            Ideas that move <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent to-purple-accent">AI forward.</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
            I distill complex AI concepts into clear, honest writing. No buzzwords. No doomscrolling bait. Just thinking that earns your time.
          </motion.p>
        </div>

        {/* Featured Article */}
        <motion.div variants={itemVariants} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-accent/20 to-purple-accent/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-surface/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-accent/10 border border-cyan-accent/20 text-cyan-accent text-xs font-mono uppercase tracking-widest">
                    {featuredArticle.tag}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500 text-xs font-mono">
                    <Clock size={14} /> {featuredArticle.time}
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold font-grotesk text-white group-hover:text-cyan-accent transition-colors duration-300">
                  {featuredArticle.title}
                </h3>
                
                <div className="border-l-2 border-cyan-accent/30 pl-6 py-2">
                  <p className="text-gray-300 italic text-lg font-light leading-relaxed">
                    "{featuredArticle.quote}"
                  </p>
                </div>
                
                <p className="text-gray-400 text-base leading-relaxed">
                  {featuredArticle.description}
                </p>
                
                <a href={featuredArticle.link} className="inline-flex items-center gap-2 text-white font-mono text-sm group/btn hover:text-cyan-accent transition-colors pt-4">
                  Read article <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
              </div>
              
              <div className="hidden lg:flex w-1/3 aspect-square bg-gradient-to-br from-surface to-background border border-white/5 rounded-2xl items-center justify-center relative overflow-hidden group-hover:border-cyan-accent/20 transition-colors">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <BookOpen size={80} className="text-white/5 group-hover:text-cyan-accent/20 transition-all duration-500 group-hover:scale-110" />
                <Sparkles size={40} className="absolute top-8 right-8 text-cyan-accent/10 animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trending Section */}
        <div className="space-y-10">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="text-xl font-bold font-grotesk text-white flex items-center gap-2">
              Trending <Sparkles size={20} className="text-cyan-accent" />
            </h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trendingArticles.map((article, index) => (
              <motion.a
                href={article.link}
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group p-6 rounded-2xl bg-surface/30 border border-white/5 hover:border-cyan-accent/30 hover:bg-surface/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-white/5 text-gray-400 group-hover:text-cyan-accent group-hover:bg-cyan-accent/5 transition-all">
                      {article.tag}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      {article.time}
                    </span>
                  </div>
                  <ArrowUpRight size={18} className="text-gray-600 group-hover:text-cyan-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                
                <h5 className="text-xl font-bold font-grotesk text-white mb-3 group-hover:text-cyan-accent transition-colors">
                  {article.title}
                </h5>
                
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {article.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div variants={itemVariants} className="text-center pt-10 border-t border-white/10">
          <p className="text-gray-500 font-mono text-sm mb-6 italic">
            Publishing when it matters. — Sham
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-surface border border-white/10 text-white hover:border-cyan-accent hover:text-cyan-accent transition-all font-mono text-sm tracking-widest uppercase hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
          >
            View all articles 12+
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
