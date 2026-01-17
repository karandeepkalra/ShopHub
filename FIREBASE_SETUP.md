# Firebase Setup Instructions

## 🔥 Step 1: Install Firebase
```bash
npm install firebase
```

## 🔥 Step 2: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter your project name (e.g., "shophub-ecommerce")
4. Enable Google Analytics (optional)
5. Click "Create project"

## 🔥 Step 3: Enable Authentication
1. In Firebase Console, go to "Authentication" → "Get started"
2. Enable "Email/Password" sign-in method
3. Click "Save"

## 🔥 Step 4: Enable Firestore Database
1. Go to "Firestore Database" → "Create database"
2. Choose "Start in test mode" (for development)
3. Select a location (choose closest to your users)
4. Click "Create database"

## 🔥 Step 5: Get Firebase Config
1. In Firebase Console, click the gear icon ⚙️ → "Project settings"
2. Under "Your apps", click the web icon (</>)
3. Copy the firebaseConfig object
4. Replace the placeholder config in `src/firebase/config.js`

## 🔥 Step 6: Update Firebase Config
Replace the placeholder config in `src/firebase/config.js` with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB33lilkD2Qk7NLazRc2v6ivy_Av6oAQVY",
  authDomain: "ecommerce-b8114.firebaseapp.com",
  projectId: "ecommerce-b8114",
  storageBucket: "ecommerce-b8114.firebasestorage.app",
  messagingSenderId: "253084613637",
  appId: "1:253084613637:web:43b7729edc908d0e96706c"
};
```

## 🔥 Step 7: Security Rules (Optional)
For production, update Firestore security rules in Firebase Console:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🎯 Features Implemented:
- ✅ Firebase Authentication (Email/Password)
- ✅ Firestore Database for user data
- ✅ Real-time authentication state
- ✅ Proper error handling
- ✅ Session persistence
- ✅ Secure user data storage

## 🚀 Ready to Use!
Once you complete these steps, your authentication system will be fully functional with Firebase backend!
