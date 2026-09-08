// src/components/PromiseSlide.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { audioEffects } from '../utils/audioEffects';

export default function PromiseSlide({ onContinue }) {
  const [isPromised, setIsPromised] = useState(false);

  const handlePromise = () => {
    if (isPromised) return;

    audioEffects.playPop();
    audioEffects.playHeartbeat();
    audioEffects.playChime();

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([100, 50, 100]);
      } catch (e) {}
    }

    setIsPromised(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="min-h-[100svh] w-full flex flex-col items-center justify-between p-4 py-6 text-center relative z-10 max-w-md mx-auto"
    >
      {/* Header Badge */}
      <div className="w-full flex justify-center pt-2">
        <span className="inline-flex items-center gap-1.5 bg-rose-500/20 px-4 py-1.5 rounded-full border border-rose-400/30 text-rose-200 text-sm font-semibold shadow-sm">
          <Heart size={15} className="text-rose-400 fill-rose-400 animate-pulse" />
          <span>🥹❤️ Oru chinna Promise…</span>
        </span>
      </div>

      {/* Main Glass Card */}
      <div className="glass-card-dark w-full p-6 rounded-3xl flex flex-col items-center gap-6 my-auto border border-rose-400/30 shadow-2xl relative overflow-hidden">
        
        {/* Animated Heart Icon */}
        <motion.div
          animate={isPromised ? { scale: [1, 1.3, 1] } : { scale: [1, 1.1, 1] }}
          transition={{ repeat: isPromised ? 2 : Infinity, duration: isPromised ? 0.6 : 2 }}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500/30 to-purple-500/30 border border-rose-300/40 flex items-center justify-center text-3xl shadow-lg shadow-rose-500/30"
        >
          {isPromised ? "💖" : "🥹❤️"}
        </motion.div>

        {/* Pari's Promise Lines */}
        <div className="space-y-4 text-rose-100 font-semibold leading-relaxed text-lg">
          <p className="text-xl font-bold text-white tracking-tight">
            “Aana nee enakku oru promise pannanum… ❤️”
          </p>
          <p className="text-rose-200 font-semibold text-lg">
            “Unmaiya dhaan sollanum. 🥹❤️”
          </p>
          <p className="text-amber-200 font-extrabold text-xl pt-1">
            “Promise pannitiya, Pari? 🥹”
          </p>
        </div>

        {/* Action Button: I Promise Anna ❤️ */}
        {!isPromised ? (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePromise}
            className="shimmer-btn w-full py-4 px-6 rounded-full text-white font-bold text-xl shadow-xl shadow-rose-500/30 flex items-center justify-center gap-3 border border-white/20 mt-2"
          >
            <span>I Promise Anna ❤️</span>
            <Heart size={22} className="fill-white animate-pulse" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center gap-4 pt-2"
          >
            <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
              <Sparkles size={16} className="text-amber-300 animate-spin" />
              <span>Awww… Promise Locked! 💖</span>
              <Sparkles size={16} className="text-amber-300 animate-spin" />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinue}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-xl shadow-xl shadow-rose-500/40 flex items-center justify-center gap-3 border border-white/30 animate-pulse"
            >
              <span>Next →</span>
              <ArrowRight size={22} />
            </motion.button>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
