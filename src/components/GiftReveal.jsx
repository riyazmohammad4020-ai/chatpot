// src/components/GiftReveal.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEffects } from '../utils/audioEffects';

export default function GiftReveal({ onGiftOpened }) {
  const [isShaking, setIsShaking] = useState(false);

  const handleGiftClick = () => {
    setIsShaking(true);
    audioEffects.playPop();
    audioEffects.playChime();

    // Trigger confetti burst
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff2e63', '#ff758c', '#9c27b0', '#fbbf24']
    });

    setTimeout(() => {
      onGiftOpened();
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[100svh] w-full flex flex-col items-center justify-center p-6 text-center relative z-10 bg-black/60 backdrop-blur-md"
    >
      <div className="glass-card-dark w-full max-w-sm p-8 rounded-3xl flex flex-col items-center gap-6 border border-amber-400/30 shadow-2xl">
        
        {/* Intro Header */}
        <div className="space-y-2">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold"
          >
            <Sparkles size={14} className="animate-spin" />
            Special Surprise Unlocked
          </motion.div>

          <h2 className="text-3xl font-extrabold text-white">
            Pari… 🥹❤️
          </h2>

          <p className="text-sm text-rose-100/90 leading-relaxed font-normal">
            Questions ellam mudinjiduchu…<br />
            <span className="text-rose-300 font-semibold">But unakkaga innum oru chinna surprise irukku. 🎁</span>
          </p>
        </div>

        {/* Animated Gift Box Container */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleGiftClick}
          className={`relative p-8 rounded-3xl bg-gradient-to-br from-rose-500/20 via-purple-500/20 to-amber-500/20 border border-rose-300/40 shadow-2xl shadow-rose-500/30 cursor-pointer ${
            isShaking ? 'animate-gift-shake' : 'animate-gift-bounce'
          }`}
        >
          {/* Floating Sparkles around gift */}
          <Sparkles size={24} className="absolute -top-2 -right-2 text-amber-300 animate-pulse" />
          <Heart size={20} className="absolute -bottom-2 -left-2 text-rose-400 fill-rose-400/40 animate-bounce" />

          {/* Gift Icon */}
          <Gift className="w-24 h-24 text-amber-300 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
        </motion.button>

        {/* Action Prompt */}
        <p className="text-base font-bold text-amber-200 animate-pulse flex items-center gap-2">
          <span>Tap the gift</span>
          <span>🎁✨</span>
        </p>

      </div>
    </motion.div>
  );
}
