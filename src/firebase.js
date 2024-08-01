import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

// Function to add hardware entry
const addHardwareEntry = async (data) => {
  await addDoc(collection(db, 'hardwareAssignments'), data);
};

// Function to update stock
const updateStock = async (item, quantity) => {
  const stockDocRef = doc(db, 'stockInventory', item);
  const stockDoc = await getDoc(stockDocRef);
  if (stockDoc.exists()) {
    const currentStock = stockDoc.data().availableStock;
    await updateDoc(stockDocRef, {
      availableStock: currentStock + quantity
    });
  }
};

// Function to set initial stock
const setStock = async (item, totalStock) => {
  await setDoc(doc(db, 'stockInventory', item), {
    totalStock: totalStock,
    availableStock: totalStock
  });
};

export {
  db,
  addHardwareEntry,
  updateStock,
  setStock,
  doc,
  getDoc,
  Timestamp
};
