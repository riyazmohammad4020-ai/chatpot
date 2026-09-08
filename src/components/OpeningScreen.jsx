// src/components/OpeningScreen.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
import { audioEffects } from '../utils/audioEffects';

export default function OpeningScreen({ onOpen }) {
  const handleTap = () => {
    audioEffects.playPop();
    audioEffects.playChime();
    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100svh] w-full flex flex-col items-center justify-center p-6 text-center relative z-10"
    >
      <div className="glass-card-dark w-full max-w-sm p-8 rounded-3xl flex flex-col items-center gap-6 border border-rose-400/20 shadow-2xl">
        
        {/* Animated Icon Badge */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500/30 to-purple-500/30 border border-rose-300/40 flex items-center justify-center shadow-lg shadow-rose-500/30"
        >
          <Heart className="w-10 h-10 text-rose-400 fill-rose-400/30 animate-pulse" />
        </motion.div>

        {/* Title */}
        <div className="space-y-2">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles size={14} className="text-amber-300 animate-spin" />
            Special Sibling Dedication
          </motion.div>

          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-rose-300 via-pink-200 to-purple-300 bg-clip-text text-transparent drop-shadow-sm leading-tight"
          >
            ✨ Riyas dedicates to Pari ✨
          </motion.h1>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base text-rose-100/80 font-medium"
          >
            Oru chinna surprise… unakkaga mattum ❤️
          </motion.p>
        </div>

        {/* Action Button */}
        <motion.button
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTap}
          className="shimmer-btn w-full py-4 px-6 rounded-full text-white font-bold text-lg shadow-xl shadow-rose-500/30 flex items-center justify-center gap-3 transition-all duration-300 border border-white/20"
        >
          <span>Tap to open</span>
          <MailOpen size={20} className="animate-bounce" />
        </motion.button>

        <p className="text-xs text-white/40">Made with extra love by your Anna 🫂</p>
      </div>
    </motion.div>
  );
}
