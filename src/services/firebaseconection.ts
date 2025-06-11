
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import  { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-JJCW07bo7qpRaEDIRcbMKIXMF5_OO0U",
  authDomain: "web-carros-3deb0.firebaseapp.com",
  projectId: "web-carros-3deb0",
  storageBucket: "web-carros-3deb0.firebasestorage.app",
  messagingSenderId: "253175490766",
  appId: "1:253175490766:web:f2e29191487a8f9dc9c89f"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };