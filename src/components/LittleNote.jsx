// src/components/LittleNote.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { audioEffects } from '../utils/audioEffects';

export default function LittleNote({ noteText, onContinue }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      audioEffects.playChime();
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="min-h-[100svh] w-full flex flex-col items-center justify-center p-6 text-center relative z-10"
    >
      {loading ? (
        <div className="glass-card-dark w-full max-w-sm p-8 rounded-3xl flex flex-col items-center gap-6 border border-purple-400/20 shadow-2xl">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500/20 to-purple-500/30 flex items-center justify-center text-3xl"
          >
            👀
          </motion.div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Wait… 👀</h3>
            <p className="text-rose-200/80 font-medium">Reading Pari’s little note… 💌</p>
          </div>
        </div>
      ) : (
        <div className="glass-card-dark w-full max-w-sm p-8 rounded-3xl flex flex-col items-center gap-6 border border-pink-400/30 shadow-2xl relative">
          
          {/* Header Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold">
            <Sparkles size={14} className="text-amber-300" />
            💌 Pari’s Little Note
          </div>

          {/* Handwritten Card Container */}
          <motion.div
            initial={{ rotate: -2, scale: 0.9, opacity: 0 }}
            animate={{ rotate: 1, scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full p-6 rounded-2xl bg-gradient-to-br from-amber-50/95 via-rose-50/95 to-pink-50/95 text-slate-800 text-left font-serif shadow-xl border-2 border-rose-200/80 relative"
          >
            <p className="text-lg leading-relaxed italic text-slate-800 font-medium whitespace-pre-wrap">
              "{noteText}"
            </p>

            <div className="mt-4 pt-3 border-t border-rose-200/60 flex items-center justify-between text-xs text-rose-700 font-sans font-semibold">
              <span>From Pari 🌸</span>
              <span className="flex items-center gap-1">
                Saved in Anna's heart <Heart size={12} className="fill-rose-500 text-rose-500" />
              </span>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onContinue}
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-lg shadow-lg shadow-rose-500/30 flex items-center justify-center gap-3 transition-all border border-white/20"
          >
            <span>One Last Thing</span>
            <ArrowRight size={20} />
          </motion.button>

        </div>
      )}
    </motion.div>
  );
}
