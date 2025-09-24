import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // ✅ Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDMdRcxHU6W7nMG4ghc_TQMmfSJi4jTieY",
  authDomain: "medguide-7f11d.firebaseapp.com",
  projectId: "medguide-7f11d",
  storageBucket: "medguide-7f11d.firebasestorage.app",
  messagingSenderId: "642557972448",
  appId: "1:642557972448:web:3e9ee761f23e4435dda585"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);  // ✅ add this
