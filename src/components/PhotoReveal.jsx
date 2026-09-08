// src/components/PhotoReveal.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, Sparkles, Image as ImageIcon } from 'lucide-react';
import { audioEffects } from '../utils/audioEffects';

export default function PhotoReveal({ onSubmitNote }) {
  const [noteText, setNoteText] = useState('');
  const [imgError, setImgError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    audioEffects.playPop();
    audioEffects.playChime();
    onSubmitNote(noteText.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100svh] w-full flex flex-col items-center justify-center p-4 py-8 text-center relative z-10 max-w-md mx-auto"
    >
      <div className="glass-card-dark w-full p-6 rounded-3xl flex flex-col items-center gap-6 border border-rose-400/30 shadow-2xl">
        
        {/* Photo Frame Container */}
        <div className="space-y-3 w-full">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold">
            <Sparkles size={14} className="text-amber-300" />
            Special Memory Unlocked
          </div>

          {/* Sibling Photo Frame */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full max-w-[280px] mx-auto aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl shadow-rose-500/30 group"
          >
            {!imgError ? (
              <img
                src="/pari-final-photo.jpg"
                alt="Riyas and Parinitha"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top rounded-xl transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-rose-900/60 to-purple-900/60 flex flex-col items-center justify-center p-6 text-rose-200 gap-3">
                <ImageIcon size={48} className="text-rose-300 animate-bounce" />
                <p className="font-bold text-sm">Riyas & Pari ❤️</p>
                <p className="text-xs text-rose-200/70">Place photo in /public/pari-final-photo.jpg</p>
              </div>
            )}

            {/* Glowing frame overlay */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-xl pointer-events-none" />
          </motion.div>
        </div>

        {/* Question & Note Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">
              Indha photo paathadhum… 🥹❤️
            </h3>
            <p className="text-sm text-rose-200/90 font-medium">
              Unakku first-aa enna thonuchu?
            </p>
          </div>

          <div className="relative">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Un little thought inga type pannu… 💌"
              rows={3}
              maxLength={250}
              className="w-full p-4 rounded-2xl bg-black/40 border border-rose-300/30 text-white placeholder-rose-200/40 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/30 transition-all resize-none"
            />
            <span className="absolute bottom-3 right-3 text-[10px] text-white/40 font-mono">
              {noteText.length} / 250
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={!noteText.trim()}
            className={`w-full py-3.5 px-6 rounded-full font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all duration-300 ${
              noteText.trim()
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-rose-500/30 cursor-pointer'
                : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/10'
            }`}
          >
            <span>Send it to Anna</span>
            <Heart size={18} className="fill-white/30" />
          </motion.button>
        </form>

      </div>
    </motion.div>
  );
}
