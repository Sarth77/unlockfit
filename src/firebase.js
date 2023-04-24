import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD888pJSKu5KZD_fv-Yyu0tX1vK0ERZqsw",
  authDomain: "unlock-fit.firebaseapp.com",
  projectId: "unlock-fit",
  storageBucket: "unlock-fit.appspot.com",
  messagingSenderId: "775665717741",
  appId: "1:775665717741:web:da565b8ebb10c9438d57e4",
  measurementId: "G-V2LHNHYPVC",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, storage, auth };
