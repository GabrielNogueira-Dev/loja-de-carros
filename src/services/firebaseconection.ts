
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAZq_-5MlyV7AN5zcwZ5ngW7YQz96y06E",
  authDomain: "sellcar-627d8.firebaseapp.com",
  projectId: "sellcar-627d8",
  storageBucket: "sellcar-627d8.appspot.com",
  messagingSenderId: "724232099012",
  appId: "1:724232099012:web:809a09e293a983d87da591"
};

// Só inicializa se ainda não existir
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };