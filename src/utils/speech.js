// src/utils/speech.js

export function speakReaction(text, isVoiceEnabled = true) {
  if (!isVoiceEnabled) return;
  if (!('speechSynthesis' in window)) {
    console.log("SpeechSynthesis API not supported in this browser.");
    return;
  }

  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Add natural breath pauses by expanding ellipses
    const formattedText = text
      .replace(/…/g, ', ')
      .replace(/!/g, '! ');

    const utterance = new SpeechSynthesisUtterance(formattedText);
    utterance.rate = 0.82; // Slow, natural, warm speaking rate
    utterance.pitch = 1.15; // Gentle, cheerful pitch
    utterance.volume = 1.0;

    // Pick a natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Female'))
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn("Speech error, falling back gracefully:", err);
  }
}
