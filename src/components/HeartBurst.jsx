// src/components/HeartBurst.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

export default function HeartBurst({ reactionText, isVisible, onNext }) {
  const [showNextBtn, setShowNextBtn] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowNextBtn(false);
      // Reveal "Next →" button after ~2 seconds so Pari reads reaction comfortably
      const timer = setTimeout(() => {
        setShowNextBtn(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        className="fixed inset-0 pointer-events-auto z-50 flex flex-col items-center justify-center p-6 bg-black/75 backdrop-blur-md"
      >
        {/* Big Heartbeat Animated Heart */}
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: [0.2, 1.25, 1], opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "backOut" }}
          className="relative flex items-center justify-center mb-6"
        >
          <div className="text-8xl animate-heartbeat select-none drop-shadow-[0_0_45px_rgba(255,46,99,0.9)]">
            ❤️
          </div>
          
          {/* Sparkles & Floating Hearts */}
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="absolute -top-6 -right-6 text-4xl animate-ping"
          >
            ✨
          </motion.span>

          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="absolute -bottom-6 -left-6 text-4xl animate-bounce"
          >
            💖
          </motion.span>

          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute top-1/2 -left-10 text-3xl animate-bounce"
          >
            💕
          </motion.span>

          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="absolute top-1/2 -right-10 text-3xl animate-ping"
          >
            💗
          </motion.span>
        </motion.div>

        {/* Reaction Toast Card */}
        <motion.div
          initial={{ y: 25, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="glass-card-dark px-7 py-5 rounded-3xl border border-rose-400/50 text-center shadow-[0_20px_50px_rgba(255,46,99,0.3)] max-w-sm w-full mx-4 mb-6"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs text-rose-300/80 mb-2 tracking-wider uppercase font-semibold">
            <span>🎤 Voice Reaction</span>
          </div>
          <p className="text-xl font-bold bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200 bg-clip-text text-transparent leading-relaxed">
            {reactionText}
          </p>
        </motion.div>

        {/* Next Question Manual Button (Appears after 2 seconds) */}
        <AnimatePresence>
          {showNextBtn && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="w-full max-w-xs py-4 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-lg shadow-xl shadow-rose-500/40 flex items-center justify-center gap-3 border border-white/30 animate-pulse"
            >
              <span>Next Question 💕</span>
              <ArrowRight size={20} />
            </motion.button>
          )}
        </AnimatePresence>

      </motion.div>
    </AnimatePresence>
  );
}
