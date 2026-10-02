// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nexus-node-9b7c9.firebaseapp.com",
  projectId: "nexus-node-9b7c9",
  storageBucket: "nexus-node-9b7c9.firebasestorage.app",
  messagingSenderId: "116276303797",
  appId: "1:116276303797:web:8ef3a9888bf3fcb18f6bfc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider=new GoogleAuthProvider()
