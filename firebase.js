// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK0lwzblLamk9dg2QHFgfx4Xux-Sg6lgE",
  authDomain: "ipl-player-predictor.firebaseapp.com",
  projectId: "ipl-player-predictor",
  storageBucket: "ipl-player-predictor.firebasestorage.app",
  messagingSenderId: "603830667037",
  appId: "1:603830667037:web:10f89e0921928fc8fc43f4",
  measurementId: "G-00D5B0Z443"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, analytics };