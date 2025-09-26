// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-short-video-generator-a6ef9.firebaseapp.com",
  projectId: "ai-short-video-generator-a6ef9",
  storageBucket: "ai-short-video-generator-a6ef9.firebasestorage.app",
  messagingSenderId: "283408420265",
  appId: "1:283408420265:web:80c6939aa215c16b67c8b8",
  measurementId: "G-2F9ZS274L5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);