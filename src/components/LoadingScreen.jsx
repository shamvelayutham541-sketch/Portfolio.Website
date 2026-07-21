import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const LETTERS = ['S', 'h', 'a', 'm'];

export default function LoadingScreen() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);

  // Typewriter: reveal one letter every 160ms
  useEffect(() => {
    if (visibleCount < LETTERS.length) {
      const t = setTimeout(() => setVisibleCount((c) => c + 1), 160);
      return () => clearTimeout(t);
    } else {
      // Blink cursor a couple times then hide it
      const t = setTimeout(() => {
        setShowCursor(false);
        setDone(true);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [visibleCount]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 380);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #00e5ff 0%, #7c3aed 50%, transparent 70%)' }}
        />
      </div>

      {/* Scan-line shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,229,255,0.025) 3px, rgba(0,229,255,0.025) 4px)',
        }}
        animate={{ backgroundPositionY: ['0px', '400px'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Orbiting rings */}
      <div className="absolute flex items-center justify-center">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          className="absolute w-52 h-52 rounded-full"
          style={{
            border: '1.5px solid transparent',
            borderTopColor: '#00e5ff',
            borderRightColor: '#00e5ff',
            boxShadow: '0 0 18px rgba(0,229,255,0.35)',
          }}
        />
        {/* Mid ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          className="absolute w-40 h-40 rounded-full"
          style={{
            border: '1.5px solid transparent',
            borderBottomColor: '#7c3aed',
            borderLeftColor: '#7c3aed',
            boxShadow: '0 0 14px rgba(124,58,237,0.4)',
          }}
        />
        {/* Inner ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          className="absolute w-28 h-28 rounded-full"
          style={{
            border: '1px solid transparent',
            borderTopColor: 'rgba(0,229,255,0.4)',
            borderRightColor: 'rgba(124,58,237,0.4)',
          }}
        />
      </div>

      {/* Typewriter text */}
      <div className="relative z-10 flex items-center" style={{ minWidth: 140 }}>
        <span
          className="font-syncopate font-bold tracking-widest select-none"
          style={{
            fontSize: '5rem',
            background: 'linear-gradient(135deg, #ffffff 20%, #00e5ff 55%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 18px rgba(0,229,255,0.55)) drop-shadow(0 0 6px rgba(124,58,237,0.4))',
            letterSpacing: '0.18em',
          }}
        >
          <AnimatePresence>
            {LETTERS.slice(0, visibleCount).map((letter, i) => {
              if (i === 0) {
                // Premium 'S' — burst scale + glow pulse + shimmer sweep
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 2.4, filter: 'blur(20px) brightness(3)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' }}
                    transition={{ duration: 0.55, ease: [0.22, 1.2, 0.36, 1] }}
                    style={{ display: 'inline-block', position: 'relative' }}
                  >
                    {/* Shimmer sweep over the S */}
                    <motion.span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 4,
                        background:
                          'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.85) 50%, transparent 70%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        pointerEvents: 'none',
                        zIndex: 1,
                      }}
                      initial={{ backgroundPositionX: '-120%' }}
                      animate={{ backgroundPositionX: '220%' }}
                      transition={{ duration: 0.6, delay: 0.45, ease: 'easeInOut' }}
                    />
                    {/* Outer glow ring flash */}
                    <motion.span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: '-6px',
                        borderRadius: 8,
                        background: 'radial-gradient(circle, rgba(0,229,255,0.7) 0%, transparent 70%)',
                        pointerEvents: 'none',
                        zIndex: -1,
                      }}
                      initial={{ opacity: 1, scale: 1.6 }}
                      animate={{ opacity: 0, scale: 2.5 }}
                      transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                    />
                    {letter}
                  </motion.span>
                );
              }
              // Regular letters
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  style={{ display: 'inline-block' }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </span>

        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          className="ml-1 font-syncopate font-bold"
          style={{
            fontSize: '5rem',
            color: '#00e5ff',
            lineHeight: 1,
            filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.9))',
            display: done ? 'none' : 'inline-block',
          }}
        >
          |
        </motion.span>
      </div>

      {/* Subtitle running shimmer */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: visibleCount === LETTERS.length ? 1 : 0, y: visibleCount === LETTERS.length ? 0 : 10 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative z-10 mt-5 font-mono text-xs tracking-[0.45em] uppercase"
        style={{ color: 'rgba(0,229,255,0.6)' }}
      >
        Portfolio Loading...
      </motion.p>

      {/* Progress bar */}
      <div
        className="relative z-10 mt-6 rounded-full overflow-hidden"
        style={{ width: 160, height: 2, background: 'rgba(255,255,255,0.08)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #00e5ff, #7c3aed)',
            boxShadow: '0 0 8px rgba(0,229,255,0.8)',
          }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}
