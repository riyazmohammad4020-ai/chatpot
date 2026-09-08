// src/components/IntroScreen.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';
import PhotoHeart from './PhotoHeart';
import { audioEffects } from '../utils/audioEffects';

export default function IntroScreen({ onStart }) {
  const [touched, setTouched] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [textStep, setTextStep] = useState(0);

  const handleTouchHeart = () => {
    if (touched) return;

    // Sound & Haptics
    audioEffects.playPop();
    audioEffects.playHeartbeat();
    audioEffects.playChime();

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([100, 50, 100]);
      } catch (e) {}
    }

    setIsPulsing(true);

    // Sequence transition
    setTimeout(() => {
      setTouched(true);
      setIsPulsing(false);
      
      // Step through conversation messages
      setTimeout(() => setTextStep(1), 700);
      setTimeout(() => setTextStep(2), 1500);
      setTimeout(() => setTextStep(3), 2300);
      setTimeout(() => setTextStep(4), 3100);
    }, 400);
  };

  const handleStart = () => {
    audioEffects.playPop();
    onStart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5 }}
      className="min-h-[100svh] w-full flex flex-col items-center justify-center p-4 py-6 text-center relative z-10 max-w-md mx-auto"
    >
      <div className="glass-card-dark w-full p-6 rounded-3xl flex flex-col items-center gap-5 border border-rose-400/20 shadow-2xl relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!touched ? (
            <motion.div
              key="pre-touch"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-4 w-full"
            >
              {/* Above Heart Alert Header */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-sm font-bold shadow-sm">
                <AlertTriangle size={16} className="text-amber-300 animate-bounce" />
                <span>⚠️ Attention Pari! 😂</span>
              </div>

              {/* Glowing Heart Photo Frame */}
              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={handleTouchHeart}
                className="cursor-pointer"
              >
                <PhotoHeart photoUrl="/pari-photo.jpg" isPulsing={isPulsing} isZoomed={isPulsing} size={210} />
              </motion.div>

              {/* Below Heart Text */}
              <div className="space-y-1">
                <p className="text-lg font-semibold text-rose-200">
                  Indha heart-a touch panna…
                </p>
                <p className="text-base text-rose-300 font-medium">
                  Un Anna oru secret reveal panna poraan 😏❤️
                </p>
              </div>

              {/* Large Interactive Heart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                onClick={handleTouchHeart}
                className="shimmer-btn w-full py-4 px-6 rounded-full text-white font-bold text-lg shadow-xl shadow-rose-500/30 flex items-center justify-center gap-2 border border-white/20 mt-2"
              >
                <span>Touch the ❤️</span>
                <Heart size={22} className="fill-white animate-pulse" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="post-touch"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col items-center gap-5 w-full py-2"
            >
              {/* Photo Heart small header view */}
              <PhotoHeart photoUrl="/pari-photo.jpg" isPulsing={false} size={150} />

              {/* Conversational Sequence Text */}
              <div className="space-y-3 min-h-[160px] flex flex-col items-center justify-center">
                {textStep >= 0 && (
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-extrabold text-white leading-snug"
                  >
                    Adei! Touch pannitiya?! 😂
                  </motion.h3>
                )}

                {textStep >= 1 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg text-rose-200 font-medium"
                  >
                    Seri seri… ippo escape illa! 😂
                  </motion.p>
                )}

                {textStep >= 2 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg text-rose-100 font-semibold"
                  >
                    Un Anna-kitta 15 chinna questions irukku… ❤️
                  </motion.p>
                )}

                {textStep >= 3 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-base text-amber-200 font-medium"
                  >
                    Aana idhu exam illa! 😌
                  </motion.p>
                )}

                {textStep >= 4 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-base text-pink-200 font-medium leading-relaxed"
                  >
                    Nithaanama padichu…<br />
                    unakku pudicha answer-a touch pannu. 🥹❤️
                  </motion.p>
                )}
              </div>

              {/* Start Button */}
              {textStep >= 4 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStart}
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-xl shadow-xl shadow-rose-500/30 flex items-center justify-center gap-3 border border-white/30"
                >
                  <span>Start 💌</span>
                  <ArrowRight size={22} />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
