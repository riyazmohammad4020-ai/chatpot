// src/components/Question16Slide.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Send, ArrowRight } from 'lucide-react';
import { audioEffects } from '../utils/audioEffects';

export default function Question16Slide({ onComplete }) {
  const [annaName, setAnnaName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!annaName.trim()) return;

    audioEffects.playPop();
    audioEffects.playHeartbeat();
    audioEffects.playChime();

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([100, 50, 100]);
      } catch (err) {}
    }

    try {
      localStorage.setItem('pari_fav_anna_name', annaName.trim());
    } catch (err) {}

    setIsSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="min-h-[100svh] w-full flex flex-col items-center justify-between p-4 py-6 text-center relative z-10 max-w-md mx-auto"
    >
      {/* Top Header Badge */}
      <div className="w-full flex justify-center pt-2">
        <span className="inline-flex items-center gap-1.5 bg-rose-500/20 px-4 py-1.5 rounded-full border border-rose-400/30 text-rose-200 text-sm font-semibold shadow-sm">
          <Heart size={15} className="text-rose-400 fill-rose-400 animate-pulse" />
          <span>Special Question 💕</span>
        </span>
      </div>

      {/* Main Glass Card */}
      <div className="glass-card-dark w-full p-6 rounded-3xl flex flex-col items-center gap-6 my-auto border border-rose-400/30 shadow-2xl relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="input-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center gap-5"
            >
              {/* Question Text */}
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-white leading-snug tracking-tight">
                  16. 💕 Unakku romba pudicha Anna name?
                </h3>
                <p className="text-base text-rose-200 font-medium leading-relaxed">
                  Unakku romba pudicha Anna-va<br />
                  nee enna name-la koopida aasapadura? 🥹❤️
                </p>
              </div>

              {/* Text Input Box */}
              <div className="w-full relative">
                <input
                  type="text"
                  value={annaName}
                  onChange={(e) => setAnnaName(e.target.value)}
                  placeholder="Unakku pudicha Anna name inga type pannu... 💌"
                  className="w-full py-4 px-5 rounded-2xl bg-white/10 border border-rose-400/40 text-white placeholder-rose-200/50 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-rose-400/80 focus:bg-white/15 transition-all shadow-inner text-center"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!annaName.trim()}
                whileHover={{ scale: annaName.trim() ? 1.04 : 1 }}
                whileTap={{ scale: annaName.trim() ? 0.95 : 1 }}
                className={`w-full py-4 px-6 rounded-full font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-all duration-300 border ${
                  annaName.trim()
                    ? 'shimmer-btn text-white border-white/20 shadow-rose-500/30 cursor-pointer'
                    : 'bg-white/10 text-white/40 border-white/10 cursor-not-allowed'
                }`}
              >
                <span>This is my Anna ❤️</span>
                <Send size={18} />
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="submitted-response"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col items-center gap-5 py-2"
            >
              {/* Heartbeat Reaction Icon */}
              <div className="text-6xl animate-heartbeat select-none drop-shadow-[0_0_35px_rgba(255,46,99,0.8)]">
                💖
              </div>

              {/* Emotional Response Text */}
              <div className="space-y-3">
                <p className="text-2xl font-extrabold text-white">
                  🥹❤️ Awww Pari…
                </p>

                <p className="text-xl font-bold bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200 bg-clip-text text-transparent leading-relaxed">
                  “Indha name ({annaName}) enakku romba special.”
                </p>

                <p className="text-sm font-semibold text-rose-300">
                  — Your Anna, Riyas 🫂❤️
                </p>
              </div>

              {/* Continue to Gift Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-xl shadow-xl shadow-rose-500/40 flex items-center justify-center gap-3 border border-white/30 animate-pulse mt-2"
              >
                <span>Continue to Gift 🎁 →</span>
                <ArrowRight size={22} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
