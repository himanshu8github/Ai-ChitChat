import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjCtatmytPyO4ZPUF7V8a8b6S9BG_L06o",
  authDomain: "aichat-364c6.firebaseapp.com",
  projectId: "aichat-364c6",
  storageBucket: "aichat-364c6.firebasestorage.app",
  messagingSenderId: "1045528991928",
  appId: "1:1045528991928:web:1a3dc6ee9ec590eb02bc4d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);