// src/components/MusicControl.jsx
import React from 'react';
import { Volume2, VolumeX, Mic, MicOff } from 'lucide-react';

export default function MusicControl({
  isMusicPlaying,
  toggleMusic,
  isVoiceEnabled,
  toggleVoice
}) {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {/* Voice Reaction Toggle */}
      <button
        onClick={toggleVoice}
        aria-label={isVoiceEnabled ? "Mute voice reactions" : "Enable voice reactions"}
        className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg ${
          isVoiceEnabled
            ? 'bg-rose-500/30 border-rose-300 text-rose-100 shadow-rose-500/20 scale-105'
            : 'bg-black/30 border-white/10 text-white/50 hover:bg-black/40'
        }`}
        title={isVoiceEnabled ? "Voice Reactions ON 🎤" : "Voice Reactions OFF 🔇"}
      >
        {isVoiceEnabled ? <Mic size={18} /> : <MicOff size={18} />}
      </button>

      {/* Music Toggle */}
      <button
        onClick={toggleMusic}
        aria-label={isMusicPlaying ? "Mute background music" : "Play background music"}
        className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg ${
          isMusicPlaying
            ? 'bg-purple-500/30 border-purple-300 text-purple-100 shadow-purple-500/20 scale-105 animate-pulse'
            : 'bg-black/30 border-white/10 text-white/50 hover:bg-black/40'
        }`}
        title={isMusicPlaying ? "Music ON 🎵" : "Music OFF 🔇"}
      >
        {isMusicPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
    </div>
  );
}
