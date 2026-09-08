# ✨ Riyas Dedicates to Pari ❤️ - Sibling Memory & Interactive Surprise Website

A mobile-first, emotional, interactive web app created by **Riyas** for his little sister **Parinitha (Pari)**.

---

## 🌟 Built Project Structure (`pari-surprise/`)

```
pari-surprise/
├── public/
│   ├── pari-photo.jpg         # Real photo of Riyas & Pari
│   └── pari-photo.png         # Backup photo format
│
├── src/
│   ├── components/
│   │   ├── OpeningScreen.jsx  # Hero section ("✨ Riyas dedicates to Pari ✨")
│   │   ├── IntroScreen.jsx    # Personal intro ("Hey Pari… 🥹❤️")
│   │   ├── QuestionScreen.jsx # 15 sequential question slides with progress bar
│   │   ├── AnswerCard.jsx     # Interactive answer card with animations & selected glow
│   │   ├── HeartBurst.jsx     # Heartbeat pulse animation & reaction toast
│   │   ├── GiftReveal.jsx     # Bouncing interactive gift box
│   │   ├── PhotoReveal.jsx    # Photo frame reveal & note textarea
│   │   ├── LittleNote.jsx     # Handwritten-style Pari's note reveal
│   │   ├── FinalMessage.jsx   # Emotional farewell message & replay button
│   │   ├── FloatingHearts.jsx # Ambient floating background heart/sparkle particles
│   │   └── MusicControl.jsx   # Music & Voice reaction toggles (🎵 / 🎤)
│   │
│   ├── data/
│   │   └── questions.js       # All 15 Tamil questions, answer options & reactions
│   │
│   ├── utils/
│   │   ├── speech.js          # SpeechSynthesis voice reaction helper & fallback
│   │   └── audioEffects.js    # Web Audio API pop, heartbeat, chime & ambient music synth
│   │
│   ├── styles/
│   │   └── animations.css     # CSS keyframes for floating, heartbeat, shimmers & glassmorphism
│   │
│   ├── App.jsx                # Main React app & screen state machine
│   ├── index.css              # Tailwind CSS imports & base styles
│   └── main.jsx               # React DOM entry point
│
├── package.json
└── vite.config.js
```

---

## 🚀 How to Run Locally

1. Open terminal inside `d:\chatbot\pari-surprise`
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` (or `http://localhost:3000`) in your browser.

---

## 🛠️ How to Customize

1. **Photo**:
   - The photo is already placed in `public/pari-photo.jpg`.
   - To update, replace `public/pari-photo.jpg` with any image.

2. **Questions & Answers**:
   - Edit `src/data/questions.js`.

3. **Voice Reaction Messages**:
   - Edit `voiceReactions` array inside `src/data/questions.js`.

4. **Build for Production**:
   ```bash
   npm run build
   ```
   Deploy the `dist/` folder to Vercel, Netlify, or GitHub Pages.
