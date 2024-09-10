// Import the necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Correct import from firebase/auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJWoR8_ufX1JWe78zPoruGFnBOA7zEqa8",
  authDomain: "medical-mind-9b44a.firebaseapp.com",
  projectId: "medical-mind-9b44a",
  storageBucket: "medical-mind-9b44a.appspot.com",
  messagingSenderId: "781623047154",
  appId: "1:781623047154:web:99f4adb92865d2f952b16b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  // Correct initialization of auth

// You can now use `auth` in your applicatio