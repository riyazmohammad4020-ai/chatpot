/* =========================================================
   AKSHOO'S DIGITAL LETTER - MAIN JOURNEY ENGINE
   ========================================================= */

// Journey Answers State
const state = {
  chapter1: '',
  chapter2: '',
  chapter3: '',
  chapter4: '',
  chapter5: '',
  chapter6: '',
  chapter7: '',
  chapter8: '',
  audioPlaying: false
};

// Toast Messages Sequence
const toastMessages = [
  "Thank you for telling me that. ❤️",
  "I'll remember your words. 🫂",
  "Okay... let me keep this close to my heart. 🥺",
  "Your smile means everything. 😊",
  "I'll always be there for you. 🤝",
  "Thank you for being honest with me. 💔",
  "Thank you for opening up. ❤️",
  "I miss those moments too. 🌌"
];

document.addEventListener('DOMContentLoaded', () => {
  showScreen('screenIntro');
  initParticleCanvas();
  initProgressDots();
  initTextareas();
  initJourneyFlow();
  initAudioSynth();
  initConfetti();
});

// =========================================================
// 1. PARTICLES & AMBIENT CANVAS
// =========================================================
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 3 + 1,
    speedY: Math.random() * 0.4 + 0.15,
    speedX: (Math.random() - 0.5) * 0.2,
    opacity: Math.random() * 0.5 + 0.2
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < 0) p.y = height;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 117, 140, ${p.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ff2e63';
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// =========================================================
// 2. PROGRESS DOTS ENGINE (❤️ ❤️ ● ○ ○ ○ ○ ○)
// =========================================================
function initProgressDots() {
  for (let i = 1; i <= 8; i++) {
    const container = document.getElementById(`dots${i}`);
    if (!container) continue;

    container.innerHTML = '';
    for (let j = 1; j <= 8; j++) {
      const dot = document.createElement('span');
      if (j < i) {
        dot.className = 'dot-unit completed';
        dot.textContent = '❤️';
      } else if (j === i) {
        dot.className = 'dot-unit active';
      } else {
        dot.className = 'dot-unit';
      }
      container.appendChild(dot);
    }
  }
}

// =========================================================
// 3. TEXTAREA AUTO-EXPAND & BUTTON VALIDATION
// =========================================================
function initTextareas() {
  for (let i = 1; i <= 8; i++) {
    const textarea = document.getElementById(`textChap${i}`);
    const counter = document.getElementById(`count${i}`);
    const button = document.getElementById(`btnChap${i}`);

    if (!textarea || !button) continue;

    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      if (counter) counter.textContent = `${len} / 300`;
      state[`chapter${i}`] = textarea.value.trim();

      // Enable button only if text is entered
      if (textarea.value.trim().length > 0) {
        button.disabled = false;
        button.style.opacity = '1';
      } else {
        button.disabled = true;
        button.style.opacity = '0.4';
      }

      // Auto-expand height
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(120, textarea.scrollHeight)}px`;
    });
  }
}

// =========================================================
// 4. JOURNEY FLOW & INTERSTITIAL TOASTS
// =========================================================
function showScreen(screenId, themeClass = null) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    target.style.display = 'flex';
  }

  if (themeClass) {
    document.body.className = themeClass;
  }
}

function showToastMessage(text, callback) {
  const toast = document.getElementById('interstitialToast');
  const toastMsg = document.getElementById('toastMsg');

  toastMsg.textContent = text;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
    if (callback) callback();
  }, 1400);
}

let currentIntroReaction = null;

function selectIntroReaction(reaction) {
  currentIntroReaction = reaction;
  const btnKiss = document.getElementById('btnStartKiss');
  const btnHug = document.getElementById('btnStartHug');
  const btnStart = document.getElementById('btnStartJourney');

  if (reaction === 'kiss') {
    if (btnKiss) btnKiss.classList.add('active-pill');
    if (btnHug) btnHug.classList.remove('active-pill');
  } else {
    if (btnHug) btnHug.classList.add('active-pill');
    if (btnKiss) btnKiss.classList.remove('active-pill');
  }

  // Enable Let's Begin button
  if (btnStart) {
    btnStart.disabled = false;
    btnStart.style.opacity = '1';
    btnStart.style.cursor = 'pointer';
  }
}

function proceedFromIntro() {
  if (!currentIntroReaction) return;

  if (typeof triggerConfetti === 'function') triggerConfetti();
  const msg = currentIntroReaction === 'kiss' 
    ? "😘 Sending lots of love to Akshoo..." 
    : "🫂 Sending a big warm hug to Akshoo...";

  showToastMessage(msg, () => {
    showScreen('screenPrivacy');
  });
}

let selectedGateOption = 'kiss';

function selectGateOption(opt) {
  selectedGateOption = opt;
  const btnKiss = document.getElementById('btnGateKiss');
  const btnHug = document.getElementById('btnGateHug');

  if (opt === 'kiss') {
    if (btnKiss) btnKiss.classList.add('active-pill');
    if (btnHug) btnHug.classList.remove('active-pill');
  } else {
    if (btnHug) btnHug.classList.add('active-pill');
    if (btnKiss) btnKiss.classList.remove('active-pill');
  }
}

function handleGateUnlock() {
  if (typeof triggerConfetti === 'function') triggerConfetti();
  showScreen('screenIntro');
}

function initJourneyFlow() {
  const btnStart = document.getElementById('btnStartJourney');
  if (btnStart) {
    btnStart.addEventListener('click', () => showScreen('screenPrivacy'));
  }
  const btnPrivacy = document.getElementById('btnPrivacyUnderstand');
  if (btnPrivacy) {
    btnPrivacy.addEventListener('click', () => showScreen('chap1', 'theme-nostalgic'));
  }

  const btnHug = document.getElementById('btnGateHug');
  if (btnHug) {
    btnHug.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      triggerConfetti();
      showScreen('screenIntro');
    });
  }

  document.getElementById('btnStartJourney').addEventListener('click', () => showScreen('screenPrivacy'));
  document.getElementById('btnPrivacyUnderstand').addEventListener('click', () => showScreen('chap1', 'theme-nostalgic'));

  const themes = [
    'theme-nostalgic', 'theme-family', 'theme-caring', 'theme-hopeful',
    'theme-support', 'theme-apology', 'theme-deep', 'theme-missing'
  ];

  for (let i = 1; i <= 8; i++) {
    const button = document.getElementById(`btnChap${i}`);
    if (!button) continue;

    button.addEventListener('click', () => {
      const nextIndex = i + 1;
      const msg = toastMessages[i - 1];

      showToastMessage(msg, () => {
        if (nextIndex <= 8) {
          showScreen(`chap${nextIndex}`, themes[nextIndex - 1]);
        } else {
          startFinalCinematicTransition();
        }
      });
    });
  }
}

// =========================================================
// 5. CINEMATIC FINAL TRANSITION & SUBMISSION
// =========================================================
function startFinalCinematicTransition() {
  showScreen('screenFinalTransition', 'theme-missing');

  const text1 = document.getElementById('fadeText1');
  const text2 = document.getElementById('fadeText2');
  const emojiBox = document.getElementById('emojiSeqBox');
  const smile = document.getElementById('emojiSmile');
  const hug = document.getElementById('emojiHug');
  const kiss = document.getElementById('emojiKiss');
  const finalNote = document.getElementById('finalNoteBox');

  // Text 1
  setTimeout(() => text1.classList.add('visible'), 500);

  // Text 2
  setTimeout(() => text2.classList.remove('hidden'), 1800);
  setTimeout(() => text2.classList.add('visible'), 2000);

  // Emojis sequence
  setTimeout(() => emojiBox.classList.remove('hidden'), 3500);
  setTimeout(() => smile.classList.add('visible'), 3800);
  setTimeout(() => hug.classList.add('visible'), 4400);
  setTimeout(() => kiss.classList.add('visible'), 5000);

  // Final note box
  setTimeout(() => finalNote.classList.remove('hidden'), 6000);

  // Final finish button listener
  document.getElementById('btnFinalFinish').onclick = submit8ChapterAnswers;
}

async function submit8ChapterAnswers() {
  const finishBtn = document.getElementById('btnFinalFinish');
  finishBtn.disabled = true;
  finishBtn.textContent = 'Saving... ❤️';

  const responseObj = {
    id: 'resp_' + Date.now(),
    chapter1: state.chapter1 || 'N/A',
    chapter2: state.chapter2 || 'N/A',
    chapter3: state.chapter3 || 'N/A',
    chapter4: state.chapter4 || 'N/A',
    chapter5: state.chapter5 || 'N/A',
    chapter6: state.chapter6 || 'N/A',
    chapter7: state.chapter7 || 'N/A',
    chapter8: state.chapter8 || 'N/A',
    timestamp: new Date().toISOString()
  };

  // Submit to Firestore if active
  if (isFirebaseActive && db) {
    try {
      await db.collection('responses').add({
        ...responseObj,
        serverTimestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("🔥 All 8 chapter answers saved to Firestore!");
    } catch (err) {
      console.error("Firestore submission error, falling back to LocalStore:", err);
    }
  }

  // Always save to fallback LocalStore
  LocalStore.saveResponse(responseObj);

  // Launch Confetti Celebration
  triggerConfetti();

  setTimeout(() => {
    showScreen('screenThankYou');
  }, 600);
}

// =========================================================
// 6. AUDIO SYNTH ENGINE (SOFT LOFI PIANO)
// =========================================================
let audioCtx, noiseNode, gainNode;

function initAudioSynth() {
  const btn = document.getElementById('audioToggleBtn');
  const icon = document.getElementById('audioIcon');

  btn.addEventListener('click', () => {
    if (!state.audioPlaying) {
      startAmbientAudio();
      btn.classList.add('active');
      icon.className = 'fa-solid fa-volume-high';
      state.audioPlaying = true;
    } else {
      stopAmbientAudio();
      btn.classList.remove('active');
      icon.className = 'fa-solid fa-volume-xmark';
      state.audioPlaying = false;
    }
  });
}

function startAmbientAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const bufferSize = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;

  noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = buffer;
  noiseNode.loop = true;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 600;

  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.05;

  noiseNode.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  noiseNode.start();
}

function stopAmbientAudio() {
  if (noiseNode) noiseNode.stop();
  if (audioCtx) audioCtx.close();
}

// =========================================================
// 7. CONFETTI ANIMATION ENGINE
// =========================================================
function initConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 90 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height - height,
    size: Math.random() * 8 + 4,
    color: ['#ff2e63', '#ff758c', '#9c27b0', '#fbbf24', '#ffffff'][Math.floor(Math.random() * 5)],
    speedY: Math.random() * 4 + 2,
    speedX: Math.random() * 2 - 1,
    rotation: Math.random() * 360
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, width, height);
    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += 2;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    frame++;
    if (frame < 140) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, width, height);
  }
  draw();
}
