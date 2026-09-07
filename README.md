# Sister Surprise ❤️ - "A Small Journey For You"

A cinematic, emotional, and interactive digital web application created specially as a surprise journey for a sister (**Akshoo**). Built with vanilla HTML5, CSS3, JavaScript, Firebase Firestore, and Firebase Authentication.

---

## 🌟 Key Features

- **Cinematic 6-Screen Story Journey**:
  - **Screen 1 — Welcome**: *"A Small Journey For You ❤️ - Ready, Akshoo?"* with glowing start button & floating particles.
  - **Screen 2 — Intro & Privacy Assurance**: *"We met in college..."* with explicit privacy transparency notice.
  - **Screen 3 — Question 1**: *"Nanba... apram naan unniyo romba kashtapaduthitten... 😔"*
  - **Screen 4 — Question 2**: *"Nee en kooda 1.5 month-ku munnaadi eppadi irunthiyo..."* + Custom textarea & character counter.
  - **Screen 5 — Question 3**: Darker emotional screen with heartbeat background pulse: *"En mela unakku innum kovam irukka?"*
  - **Screen 6 — Final Emotional Celebration**: Interactive animated reaction icons (`😊` `🫂` `😘`) + *"Thanks Akshooo ❤️"* subtext.
  - **Screen 7 — Thank You**: Confetti explosion 🎉 & *"Thank you for being honest, Akshoo ❤️"*.

- **Private Admin Dashboard (`admin.html`)**:
  - Firebase Authentication protected (Email & Password login).
  - Stats overview (Total Submissions, Latest Submission Time).
  - Search & Sort filter controls.
  - Response cards breakdown with un-truncated detail modal.
  - Delete entry capability with confirmation modal.
  - Offline Demo Fallback mode out-of-the-box.

---

## 📁 File Structure

```
sister-surprise/
├── index.html            # Main 6-screen journey layout
├── style.css             # Glassmorphism design system & animations
├── script.js            # Journey state machine, screen transitions & submission
│
├── admin.html            # Protected Brother Admin Dashboard & Login modal
├── admin.css             # Admin dashboard styling
├── admin.js              # Admin auth, Firestore response queries & delete controls
│
├── firebase-config.js    # Firebase Config SDK v10 & LocalStorage fallback
└── README.md             # Complete documentation
```

---

## 🔐 Firebase Setup Instructions

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Create Project** and name it `sister-surprise`.
3. Add a Web App (`</>`) to the project and copy your `firebaseConfig` object.

### 2. Configure Credentials in `firebase-config.js`
Open `sister-surprise/firebase-config.js` and replace the placeholder keys with your actual Firebase config parameters:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "sister-surprise.firebaseapp.com",
  projectId: "sister-surprise",
  storageBucket: "sister-surprise.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 3. Enable Firestore Database & Security Rules
1. In the Firebase Console, go to **Build > Firestore Database** and click **Create database**.
2. Select your location and choose **Start in test mode** (or production mode).
3. Under the **Rules** tab, set the following security rules so public users can create responses, but only authenticated Admin (you) can read/delete them:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /responses/{responseId} {
      // Anyone can submit an answer
      allow create: if true;
      
      // Only authenticated admin can read, update, or delete answers
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

### 4. Enable Firebase Authentication
1. Go to **Build > Authentication** and click **Get Started**.
2. Under **Sign-in method**, enable **Email/Password**.
3. Under **Users**, click **Add user** and create your admin login credentials (e.g. `admin@brother.com` with a strong password).

---

## 💡 Running Offline / Demo Mode

If you run the app locally BEFORE configuring your production Firebase credentials:
- The app automatically runs in **Offline Demo Fallback Mode**!
- Submissions are saved to `LocalStorage`.
- You can log into the Admin Dashboard (`admin.html`) using the Demo Credentials:
  - **Email**: `admin@brother.com`
  - **Password**: `brother123`

---

## 🚀 Deployment (Netlify, Vercel, or Firebase Hosting)

To deploy live on Netlify or Vercel:
1. Upload the `sister-surprise/` folder directly to Netlify Drop (https://app.netlify.com/drop).
2. Share the generated public URL (e.g., `https://your-sister-surprise.netlify.app`) with Akshoo!
3. Keep the `/admin.html` link private for your own review!
