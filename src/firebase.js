import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_KEY,
  projectId: "hardware-392e2",
  storageBucket: "hardware-392e2.appspot.com",
  messagingSenderId: "904722082654",
  appId: "1:904722082654:web:6129fbc6040d0bd431fdcf"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

export { db, collection, addDoc, getDocs, doc, setDoc, Timestamp };
