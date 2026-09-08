// src/App.jsx
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import OpeningScreen from './components/OpeningScreen';
import IntroScreen from './components/IntroScreen';
import QuestionScreen from './components/QuestionScreen';
import PromiseSlide from './components/PromiseSlide';
import Question16Slide from './components/Question16Slide';
import GiftReveal from './components/GiftReveal';
import PhotoReveal from './components/PhotoReveal';
import LittleNote from './components/LittleNote';
import FinalMessage from './components/FinalMessage';
import FloatingHearts from './components/FloatingHearts';
import MusicControl from './components/MusicControl';

import { questions } from './data/questions';
import { audioEffects } from './utils/audioEffects';

export default function App() {
  // Navigation Screens: 'opening' | 'intro' | 'questions' | 'promise' | 'question16' | 'gift' | 'photo' | 'note' | 'final'
  const [currentScreen, setCurrentScreen] = useState('opening');
  const [questionIndex, setQuestionIndex] = useState(0);
  
  // Toggles & Preferences
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  
  // Stored Note in localStorage/state
  const [pariNoteText, setPariNoteText] = useState(() => {
    return localStorage.getItem('pari_note_backup') || '';
  });

  // Audio BGM Synthesizer (Web Audio Ambient Soft Lofi Drone)
  useEffect(() => {
    let synthOsc1 = null;
    let synthOsc2 = null;
    let gainNode = null;

    if (isMusicPlaying) {
      audioEffects.init();
      if (audioEffects.ctx) {
        try {
          const now = audioEffects.ctx.currentTime;
          synthOsc1 = audioEffects.ctx.createOscillator();
          synthOsc2 = audioEffects.ctx.createOscillator();
          gainNode = audioEffects.ctx.createGain();

          synthOsc1.type = 'sine';
          synthOsc1.frequency.setValueAtTime(261.63, now); // C4

          synthOsc2.type = 'triangle';
          synthOsc2.frequency.setValueAtTime(329.63, now); // E4

          gainNode.gain.setValueAtTime(0.04, now);

          synthOsc1.connect(gainNode);
          synthOsc2.connect(gainNode);
          gainNode.connect(audioEffects.ctx.destination);

          synthOsc1.start(now);
          synthOsc2.start(now);
        } catch (e) {
          console.warn("Synth error:", e);
        }
      }
    }

    return () => {
      try {
        if (synthOsc1) synthOsc1.stop();
        if (synthOsc2) synthOsc2.stop();
      } catch (e) {}
    };
  }, [isMusicPlaying]);

  // Handlers
  const handleOpenJourney = () => {
    setIsMusicPlaying(true);
    setCurrentScreen('intro');
  };

  const handleStartQuestions = () => {
    setQuestionIndex(0);
    setCurrentScreen('questions');
  };

  const handleAnswerSelected = (id, answerText) => {
    // Optionally store answers
  };

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      // 15/15 completed -> Promise Slide
      setCurrentScreen('promise');
    }
  };

  const handlePromiseComplete = () => {
    setCurrentScreen('question16');
  };

  const handleQuestion16Complete = () => {
    setCurrentScreen('gift');
  };

  const handleGiftOpened = () => {
    setCurrentScreen('photo');
  };

  const handleSubmitNote = (text) => {
    setPariNoteText(text);
    localStorage.setItem('pari_note_backup', text);
    setCurrentScreen('note');
  };

  const handleReplay = () => {
    setQuestionIndex(0);
    setCurrentScreen('opening');
  };

  return (
    <div className="relative min-h-[100svh] w-full bg-slate-950 text-slate-100 overflow-hidden font-sans select-none flex items-center justify-center">
      
      {/* Dynamic Background Ambient Blurs */}
      <div className="fixed -top-40 -left-40 w-96 h-96 rounded-full bg-rose-600/20 blur-[120px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />

      {/* Floating Hearts Particles */}
      <FloatingHearts count={16} isExploding={currentScreen === 'gift'} />

      {/* Music & Voice Control Toggles */}
      <MusicControl
        isMusicPlaying={isMusicPlaying}
        toggleMusic={() => setIsMusicPlaying(!isMusicPlaying)}
        isVoiceEnabled={isVoiceEnabled}
        toggleVoice={() => setIsVoiceEnabled(!isVoiceEnabled)}
      />

      {/* Main Screen Transition Manager */}
      <AnimatePresence mode="wait">
        {currentScreen === 'opening' && (
          <OpeningScreen key="opening" onOpen={handleOpenJourney} />
        )}

        {currentScreen === 'intro' && (
          <IntroScreen key="intro" onStart={handleStartQuestions} />
        )}

        {currentScreen === 'questions' && (
          <QuestionScreen
            key={`q_${questionIndex}`}
            questionData={questions[questionIndex]}
            currentIndex={questionIndex}
            totalQuestions={questions.length}
            onAnswerSelected={handleAnswerSelected}
            onNext={handleNextQuestion}
            isVoiceEnabled={isVoiceEnabled}
          />
        )}

        {currentScreen === 'promise' && (
          <PromiseSlide key="promise" onContinue={handlePromiseComplete} />
        )}

        {currentScreen === 'question16' && (
          <Question16Slide key="question16" onComplete={handleQuestion16Complete} />
        )}

        {currentScreen === 'gift' && (
          <GiftReveal key="gift" onGiftOpened={handleGiftOpened} />
        )}

        {currentScreen === 'photo' && (
          <PhotoReveal key="photo" onSubmitNote={handleSubmitNote} />
        )}

        {currentScreen === 'note' && (
          <LittleNote
            key="note"
            noteText={pariNoteText}
            onContinue={() => setCurrentScreen('final')}
          />
        )}

        {currentScreen === 'final' && (
          <FinalMessage key="final" onReplay={handleReplay} />
        )}
      </AnimatePresence>

    </div>
  );
}
