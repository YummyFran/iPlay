import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBOmjuRkesVnzJ2qtFNPXQIg80CLk0QOWw",
  authDomain: "iplay-d39eb.firebaseapp.com",
  projectId: "iplay-d39eb",
  storageBucket: "iplay-d39eb.appspot.com",
  messagingSenderId: "572840356176",
  appId: "1:572840356176:web:4374fdddccbfd9c660e455",
  measurementId: "G-830PC4Q1P9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const google = new GoogleAuthProvider(auth)
