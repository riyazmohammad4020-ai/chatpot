// src/components/AnswerCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function AnswerCard({
  text,
  index,
  isSelected,
  isDisabled,
  onSelect
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.28, // 280ms sequential delay between cards
        duration: 0.5,
        ease: "easeOut"
      }}
      whileTap={{ scale: isDisabled ? 1 : 0.96 }}
      onClick={onSelect}
      disabled={isDisabled}
      className={`w-full py-4 px-5 rounded-2xl text-left font-semibold text-base transition-all duration-300 flex items-center justify-between border shadow-md ${
        isSelected
          ? 'bg-gradient-to-r from-rose-500/90 via-pink-600/90 to-purple-600/90 text-white border-rose-300 shadow-[0_0_25px_rgba(255,46,99,0.6)] scale-[1.03] ring-2 ring-rose-400/60'
          : isDisabled
          ? 'bg-white/5 border-white/10 text-white/40 opacity-40 cursor-not-allowed'
          : 'bg-white/10 hover:bg-white/15 border-white/20 text-white shadow-black/20 hover:border-rose-400/40 active:scale-[0.98]'
      }`}
    >
      <span className="flex-1 pr-2 leading-snug">{text}</span>
      {isSelected && (
        <span className="text-xl animate-bounce">💖</span>
      )}
    </motion.button>
  );
}
