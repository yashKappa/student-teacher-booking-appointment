// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3JSXw3-d4En4rjQDmUQNhcg4tT-eVTYc",
  authDomain: "student-teacher-d7784.firebaseapp.com",
  projectId: "student-teacher-d7784",
  storageBucket: "student-teacher-d7784.appspot.com",
  messagingSenderId: "1075959236231",
  appId: "1:1075959236231:web:74340b3aae9ba12cf31a22",
  measurementId: "G-KEG4V0HC42"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, db, doc, setDoc };
