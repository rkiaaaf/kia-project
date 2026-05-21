import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1ISkBoL7RWWxyp5cwsczz9-hvL5pMWJY",
  authDomain: "catatan-penilaian.firebaseapp.com",
  projectId: "catatan-penilaian",
  storageBucket: "catatan-penilaian.firebasestorage.app",
  messagingSenderId: "782617293119",
  appId: "1:782617293119:web:393a51595a22c06bcca38a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
