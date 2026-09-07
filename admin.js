/* =========================================================
   SISTER SURPRISE - PRIVATE ADMIN DASHBOARD ENGINE
   ========================================================= */

// Admin State
let allResponses = [];
let targetDeleteId = null;
let isAuthenticated = false;

const CHAPTER_METADATA = [
  { num: "CHAPTER 01", title: "Nee en kooda 1.5 month-ku munnaadi eppadi irunthiyo...", key: "chapter1" },
  { num: "CHAPTER 02", title: "Amma Appa-va nalla paathuko... ❤️", key: "chapter2" },
  { num: "CHAPTER 03", title: "Pariyaiyum Domar Thalayanum nalla paathuko... 🥹❤️", key: "chapter3" },
  { num: "CHAPTER 04", title: "Epovume alugaadha... 🥺❤️", key: "chapter4" },
  { num: "CHAPTER 05", title: "Yappa kooptalum... naan anga iruppen. 🫂❤️", key: "chapter5" },
  { num: "CHAPTER 06", title: "Naan unna hurt pannitten... Sorry. 😔💔", key: "chapter6" },
  { num: "CHAPTER 07", title: "Nanba... naan unna romba kashtapaduthitten. 😔", key: "chapter7" },
  { num: "CHAPTER 08", title: "Miss You... 🥺❤️", key: "chapter8" }
];

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initDashboardControls();
});

// =========================================================
// 1. AUTHENTICATION (FIREBASE AUTH & DEMO FALLBACK)
// =========================================================
function initAuth() {
  const loginForm = document.getElementById('loginForm');
  const loginScreen = document.getElementById('loginScreen');
  const dashboard = document.getElementById('dashboardContainer');

  // Check Firebase Auth state if Firebase is active
  if (isFirebaseActive && auth) {
    auth.onAuthStateChanged(user => {
      if (user) {
        isAuthenticated = true;
        loginScreen.classList.add('hidden');
        dashboard.classList.remove('hidden');
        fetchResponses();
      } else {
        isAuthenticated = false;
        loginScreen.classList.remove('hidden');
        dashboard.classList.add('hidden');
      }
    });
  } else {
    // Check LocalStorage Session Fallback
    const session = sessionStorage.getItem('admin_session');
    if (session === 'active') {
      isAuthenticated = true;
      loginScreen.classList.add('hidden');
      dashboard.classList.remove('hidden');
      fetchResponses();
    }
  }

  // Handle Login Form Submit
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value.trim();
    const pass = document.getElementById('adminPassword').value.trim();

    if (isFirebaseActive && auth) {
      try {
        await auth.signInWithEmailAndPassword(email, pass);
        showToast("🔑 Firebase Admin Login Successful!");
      } catch (err) {
        console.error("Firebase Login Error:", err);
        showToast("⚠️ Firebase Auth Error: " + err.message);
      }
    } else {
      // Offline Demo Fallback Login
      if (email === 'admin@brother.com' && pass === 'brother123') {
        sessionStorage.setItem('admin_session', 'active');
        isAuthenticated = true;
        loginScreen.classList.add('hidden');
        dashboard.classList.remove('hidden');
        showToast("🔑 Logged in via Demo Credentials!");
        fetchResponses();
      } else {
        showToast("⚠️ Invalid Email or Password!");
      }
    }
  });

  // Logout Handler
  document.getElementById('btnLogout').addEventListener('click', () => {
    if (isFirebaseActive && auth) {
      auth.signOut();
    }
    sessionStorage.removeItem('admin_session');
    isAuthenticated = false;
    loginScreen.classList.remove('hidden');
    dashboard.classList.add('hidden');
    showToast("👋 Logged out securely.");
  });
}

// =========================================================
// 2. FETCH RESPONSES (FIRESTORE OR LOCALSTORE)
// =========================================================
function fetchResponses() {
  if (isFirebaseActive && db) {
    db.collection('responses')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        allResponses = [];
        snapshot.forEach(doc => {
          allResponses.push({ id: doc.id, ...doc.data() });
        });
        renderDashboard();
      }, err => {
        console.error("Firestore listener error, using LocalStore fallback:", err);
        allResponses = LocalStore.getResponses();
        renderDashboard();
      });
  } else {
    allResponses = LocalStore.getResponses();
    renderDashboard();
  }
}

// =========================================================
// 3. DASHBOARD CONTROLS & RENDER
// =========================================================
function initDashboardControls() {
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const refreshBtn = document.getElementById('btnRefresh');

  searchInput.addEventListener('input', () => renderDashboard());
  sortSelect.addEventListener('change', () => renderDashboard());
  refreshBtn.addEventListener('click', () => {
    fetchResponses();
    showToast("🔄 Responses refreshed!");
  });

  // Modal Closers
  document.getElementById('closeViewModalBtn').addEventListener('click', () => {
    document.getElementById('viewModal').classList.add('hidden');
  });
  document.getElementById('closeDeleteModalBtn').addEventListener('click', () => {
    document.getElementById('deleteModal').classList.add('hidden');
  });
  document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
    document.getElementById('deleteModal').classList.add('hidden');
  });

  // Confirm Delete
  document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
    if (!targetDeleteId) return;

    if (isFirebaseActive && db) {
      try {
        await db.collection('responses').doc(targetDeleteId).delete();
        showToast("🗑️ Response entry deleted from Firestore!");
      } catch (err) {
        console.error("Error deleting from Firestore:", err);
      }
    }

    LocalStore.deleteResponse(targetDeleteId);
    document.getElementById('deleteModal').classList.add('hidden');
    targetDeleteId = null;
    fetchResponses();
    showToast("🗑️ Response entry removed!");
  });
}

function renderDashboard() {
  const searchVal = document.getElementById('searchInput').value.toLowerCase().trim();
  const sortVal = document.getElementById('sortSelect').value;
  const grid = document.getElementById('responsesGrid');

  // Filter List across all 8 chapter keys + legacy keys
  let filtered = allResponses.filter(item => {
    let combinedText = "";
    CHAPTER_METADATA.forEach(ch => {
      if (item[ch.key]) combinedText += " " + item[ch.key];
    });
    // Add fallback/legacy keys
    if (item.question1) combinedText += " " + item.question1;
    if (item.question2) combinedText += " " + item.question2;
    if (item.question3) combinedText += " " + item.question3;
    
    return combinedText.toLowerCase().includes(searchVal);
  });

  // Sort List
  filtered.sort((a, b) => {
    const tA = new Date(a.timestamp || 0).getTime();
    const tB = new Date(b.timestamp || 0).getTime();
    return sortVal === 'newest' ? tB - tA : tA - tB;
  });

  // Update Stats Overview
  document.getElementById('totalResponsesCount').textContent = filtered.length;
  if (filtered.length > 0) {
    const latestDate = new Date(filtered[0].timestamp || Date.now());
    document.getElementById('latestResponseTime').textContent = latestDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    document.getElementById('latestResponseTime').textContent = 'None';
  }

  // Render Grid
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="glass-panel" style="grid-column: 1/-1; padding: 40px; text-align: center;">
        <p class="subtitle-text">No responses found matching your filter.</p>
      </div>
    `;
    return;
  }

  filtered.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'response-card glass-panel';

    const dateStr = item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Just now';

    // Highlight Chapter 1 & Chapter 8 previews
    const ch1Preview = item.chapter1 || item.question1 || "No answer";
    const ch8Preview = item.chapter8 || item.question3 || "No answer";

    card.innerHTML = `
      <div class="card-top">
        <span class="response-id">LETTER ENTRY #${filtered.length - index}</span>
        <span class="time-badge"><i class="fa-regular fa-clock"></i> ${dateStr}</span>
      </div>

      <div class="qa-block">
        <span class="qa-question">Chapter 01 (Bond):</span>
        <div class="custom-answer-box">${escapeHtml(ch1Preview)}</div>
      </div>

      <div class="qa-block">
        <span class="qa-question">Chapter 08 (Missing):</span>
        <div class="custom-answer-box">${escapeHtml(ch8Preview)}</div>
      </div>

      <div class="card-status-pill" style="font-size: 12px; color: var(--rose-soft); font-weight: 600;">
        <i class="fa-solid fa-book-open"></i> All 8 Chapters Saved
      </div>

      <div class="card-actions">
        <button class="btn btn-secondary btn-sm btn-view-modal">
          <i class="fa-solid fa-eye"></i> View Full Letter
        </button>
        <button class="btn btn-secondary btn-sm btn-delete-entry" style="color: #ef4444; border-color: rgba(239,68,68,0.3);">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </div>
    `;

    // View Modal Trigger
    card.querySelector('.btn-view-modal').addEventListener('click', () => {
      openViewModal(item, dateStr);
    });

    // Delete Modal Trigger
    card.querySelector('.btn-delete-entry').addEventListener('click', () => {
      targetDeleteId = item.id;
      document.getElementById('deleteModal').classList.remove('hidden');
    });

    grid.appendChild(card);
  });
}

function openViewModal(item, dateStr) {
  const modal = document.getElementById('viewModal');
  document.getElementById('modalTimestamp').textContent = `Submitted on ${dateStr}`;
  
  let contentHtml = `<div class="modal-chapters-list" style="display: flex; flex-direction: column; gap: 16px; max-height: 60vh; overflow-y: auto; padding-right: 6px;">`;

  CHAPTER_METADATA.forEach((ch, idx) => {
    const val = item[ch.key] || (idx === 0 ? item.question1 : (idx === 7 ? item.question3 : null)) || "<em>No response provided</em>";
    contentHtml += `
      <div class="qa-block glass-panel" style="padding: 14px 18px; background: rgba(255, 255, 255, 0.04); border-radius: 14px;">
        <span class="qa-question" style="color: var(--rose-soft); font-weight: 700; font-size: 12px;">${ch.num} • ${escapeHtml(ch.title)}</span>
        <div class="custom-answer-box" style="margin-top: 8px; border-left: 3px solid var(--rose-primary); background: rgba(0,0,0,0.3); font-size: 14px; font-style: normal; white-space: pre-wrap;">${escapeHtml(val)}</div>
      </div>
    `;
  });

  contentHtml += `</div>`;

  document.getElementById('modalBody').innerHTML = contentHtml;
  modal.classList.remove('hidden');
}

// Utility to escape HTML strings safely
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Toast System Helper
function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

