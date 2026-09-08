// src/components/FinalMessage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles, MessageCircle } from 'lucide-react';
import { audioEffects } from '../utils/audioEffects';
import { questions } from '../data/questions';

export default function FinalMessage({ onReplay }) {
  const handleReplay = () => {
    audioEffects.playPop();
    onReplay();
  };

  const handleSendWhatsApp = () => {
    audioEffects.playPop();

    // 1. Fetch Q1-Q15 answers from LocalStorage backup
    let answersObj = {};
    try {
      answersObj = JSON.parse(localStorage.getItem('pari_answers_backup') || '{}');
    } catch (e) {}

    // 2. Fetch Anna Name & Photo Thought
    const annaName = localStorage.getItem('pari_fav_anna_name') || 'Anna';
    
    let photoThoughtRaw = '';
    try {
      photoThoughtRaw = localStorage.getItem('pari_photo_thought') || localStorage.getItem('pari_note_backup') || '';
    } catch (e) {}

    const photoThought = photoThoughtRaw.trim() ? photoThoughtRaw.trim() : "(Pari didn't type anything)";

    // 3. Build Q1-Q15 answers text lines
    let qLines = [];
    questions.forEach((q) => {
      const saved = answersObj[`q_${q.id}`];
      const ans = saved ? saved.selectedAnswer : '-';
      qLines.push(`Q${q.id}: ${ans}`);
    });

    const finalDescription = `Pari, naan unna evlo tease pannalum… nee eppovume enakku romba special dhaan.\nAlways be happy.\nAlways keep smiling.\nAnd never forget your Anna loves you so much.\n— Riyas 🫂`;

    // 4. Construct complete message format
    let msg = `💌 Pari's Surprise Results ❤️\n\n`;
    msg += qLines.join('\n') + `\n\n`;
    msg += `💕 Promise:\nI Promise Anna ❤️\n\n`;
    msg += `💌 My favourite Anna name:\n${annaName}\n\n`;
    msg += `📸 First thought after seeing the photo:\n${photoThought}\n\n`;
    msg += `🥹 Final Message:\n\n${finalDescription}\n\n`;
    msg += `— From Pari ❤️`;

    // 5. Open WhatsApp link safely with +919585654094
    const whatsappUrl = `https://wa.me/919585654094?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100svh] w-full flex flex-col items-center justify-center p-6 text-center relative z-10 max-w-md mx-auto"
    >
      <div className="glass-card-dark w-full p-6 sm:p-8 rounded-3xl flex flex-col items-center gap-5 border border-rose-400/30 shadow-2xl">
        
        {/* Animated Heart Icon */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500/30 via-pink-500/30 to-purple-500/30 border border-rose-300/40 flex items-center justify-center text-4xl shadow-xl shadow-rose-500/40"
        >
          💖
        </motion.div>

        {/* Message Content */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold">
            <Sparkles size={14} className="text-amber-300 animate-spin" />
            One Last Thing… ❤️
          </div>

          <h2 className="text-2xl font-bold text-white leading-snug">
            Pari, naan unna evlo tease pannalum… 😂<br />
            <span className="bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200 bg-clip-text text-transparent">
              nee eppovume enakku romba special dhaan. 🫂❤️
            </span>
          </h2>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-rose-100/90 text-sm leading-relaxed">
            <p>Always be happy.</p>
            <p>Always keep smiling.</p>
            <p className="font-semibold text-rose-300">
              And never forget your Anna loves you so much. ❤️
            </p>
          </div>

          <p className="text-xl font-serif font-bold text-amber-300 pt-1">
            — Riyas 🫂
          </p>
        </div>

        {/* Send to Anna on WhatsApp Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSendWhatsApp}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-rose-500 text-white font-bold text-lg shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all border border-white/20 animate-pulse mt-1"
        >
          <MessageCircle size={20} className="fill-white/20" />
          <span>Send to Anna on WhatsApp ❤️</span>
        </motion.button>

        {/* Replay Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReplay}
          className="w-full py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
        >
          <span>Replay our little memory</span>
          <RotateCcw size={16} />
        </motion.button>

      </div>
    </motion.div>
  );
}
