/* =========================================================
   SISTER SURPRISE - FIREBASE CONFIGURATION & FALLBACK ENGINE
   ========================================================= */

// NOTE FOR DEVELOPER:
// Replace the values below with your actual Firebase Project Credentials
// from the Firebase Console (https://console.firebase.google.com/)
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Global Firebase Instance Objects
let db = null;
let auth = null;
let isFirebaseActive = false;

// Initialize Firebase if valid credentials are provided
try {
  if (typeof firebase !== 'undefined' && firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY") {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    isFirebaseActive = true;
    console.log("🔥 Firebase initialized successfully!");
  } else {
    console.warn("⚠️ Firebase keys not configured yet. Running in Demo/LocalStorage Fallback mode!");
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// Fallback Local Storage Data Storage Helper
const LocalStore = {
  KEY: 'sister_surprise_responses',

  getResponses() {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : this.getDemoSeedData();
    } catch (e) {
      return this.getDemoSeedData();
    }
  },

  saveResponse(responseObj) {
    const list = this.getResponses();
    list.unshift(responseObj);
    localStorage.setItem(this.KEY, JSON.stringify(list));
    return responseObj;
  },

  deleteResponse(id) {
    let list = this.getResponses();
    list = list.filter(item => item.id !== id);
    localStorage.setItem(this.KEY, JSON.stringify(list));
  },

  getDemoSeedData() {
    return [
      {
        id: "resp_demo_101",
        question1: "Yes ❤️",
        question2: "Let's go back to normal 🫂",
        question2Custom: "I really miss how we used to laugh and talk every day in college!",
        question3: "I just want everything to be okay 🫂",
        finalIcon: "🫂 Hug",
        timestamp: new Date().toISOString()
      }
    ];
  }
};
