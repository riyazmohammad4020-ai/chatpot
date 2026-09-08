// src/components/QuestionScreen.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnswerCard from './AnswerCard';
import HeartBurst from './HeartBurst';
import { audioEffects } from '../utils/audioEffects';
import { speakReaction } from '../utils/speech';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function QuestionScreen({
  questionData,
  currentIndex,
  totalQuestions,
  onAnswerSelected,
  onNext,
  isVoiceEnabled
}) {
  const [showQuestionText, setShowQuestionText] = useState(false);
  const [showAnswerCards, setShowAnswerCards] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [showReaction, setShowReaction] = useState(false);
  const [reactionText, setReactionText] = useState('');

  // Slide entrance timing sequence
  useEffect(() => {
    setShowQuestionText(false);
    setShowAnswerCards(false);
    setSelectedIdx(null);
    setShowReaction(false);

    // 1. Wait ~1 second, then reveal question text slowly
    const qTimer = setTimeout(() => {
      setShowQuestionText(true);
    }, 1000);

    // 2. Wait ~2.2 seconds (1s after question appears), then reveal answer cards one by one
    const cTimer = setTimeout(() => {
      setShowAnswerCards(true);
    }, 2200);

    return () => {
      clearTimeout(qTimer);
      clearTimeout(cTimer);
    };
  }, [questionData.id]);

  const handleSelectAnswer = (index) => {
    if (selectedIdx !== null) return; // Prevent double taps

    // 1. Highlight selected answer immediately
    setSelectedIdx(index);
    const chosenReaction = questionData.reactions[index] || "Wowww Pari! 🥹❤️";
    const voiceMsg = questionData.voiceReactions[index] || "Wowww Pari!";
    setReactionText(chosenReaction);

    // 2. 0.2s: Show heartbeat ❤️ modal & reaction
    setTimeout(() => {
      setShowReaction(true);
    }, 200);

    // 3. 0.4s: Play sound effects & slow voice reaction
    setTimeout(() => {
      audioEffects.playPop();
      audioEffects.playHeartbeat();
      speakReaction(voiceMsg, isVoiceEnabled);
    }, 400);

    // Store response
    onAnswerSelected(questionData.id, questionData.answers[index]);
  };

  const handleNextSlide = () => {
    setShowReaction(false);
    setSelectedIdx(null);
    onNext();
  };

  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <motion.div
      key={questionData.id}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="min-h-[100svh] w-full flex flex-col items-center justify-between p-4 py-6 text-center relative z-10 max-w-md mx-auto"
    >
      {/* Top Header & Progress */}
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-rose-200/90 px-2">
          <span className="flex items-center gap-1.5 bg-rose-500/20 px-3 py-1 rounded-full border border-rose-400/30">
            <Heart size={13} className="text-rose-400 fill-rose-400 animate-pulse" />
            <span>💭 Konjam yosichu sollu Pari…</span>
          </span>
          <span className="font-mono text-rose-300 font-bold bg-black/30 px-2.5 py-1 rounded-full border border-white/10">
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
          <motion.div
            initial={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-purple-500 rounded-full shadow-sm shadow-rose-500/50"
          />
        </div>
      </div>

      {/* Main Question & Answer Card Panel */}
      <div className="glass-card-dark w-full p-6 rounded-3xl flex flex-col items-center gap-6 my-auto border border-rose-400/20 shadow-2xl relative overflow-hidden">
        
        {/* Slow Fade Question Text Reveal */}
        {showQuestionText ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full space-y-2 py-2"
          >
            <p className="text-xs font-semibold text-rose-300/80 uppercase tracking-widest flex items-center justify-center gap-1">
              <Sparkles size={13} className="text-amber-300 animate-spin" />
              <span>Riyas Anna asks</span>
            </p>
            <h3 className="text-2xl font-bold text-white leading-snug tracking-tight drop-shadow-md">
              {questionData.question}
            </h3>
          </motion.div>
        ) : (
          <div className="h-16 flex items-center justify-center">
            <span className="text-xs text-rose-200/60 flex items-center gap-1.5 animate-pulse font-medium">
              <Sparkles size={14} className="text-amber-300" />
              Thinking of Pari...
            </span>
          </div>
        )}

        {/* Sequential Answer Cards Reveal */}
        <div className="w-full flex flex-col gap-3">
          {showAnswerCards && questionData.answers.map((answerText, idx) => (
            <AnswerCard
              key={idx}
              text={answerText}
              index={idx}
              isSelected={selectedIdx === idx}
              isDisabled={selectedIdx !== null}
              onSelect={() => handleSelectAnswer(idx)}
            />
          ))}
        </div>
      </div>

      {/* Manual Next Button (If user selects or wants to advance) */}
      <div className="w-full pt-2 flex justify-end">
        <button
          onClick={handleNextSlide}
          className="text-xs font-medium text-white/60 hover:text-white flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/40 border border-white/10 transition-colors backdrop-blur-sm shadow-md"
        >
          <span>Next Slide</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Heartbeat Reaction Popup with Manual 'Next' Button */}
      <HeartBurst
        reactionText={reactionText}
        isVisible={showReaction}
        onNext={handleNextSlide}
      />
    </motion.div>
  );
}
