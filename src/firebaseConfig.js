// Import the necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJWoR8_ufX1JWe78zPoruGFnBOA7zEqa8",
  authDomain: "medical-mind-9b44a.firebaseapp.com",
  projectId: "medical-mind-9b44a",
  storageBucket: "medical-mind-9b44a.appspot.com",
  messagingSenderId: "781623047154",
  appId: "1:781623047154:web:99f4adb92865d2f952b16b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
