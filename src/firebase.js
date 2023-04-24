import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD-ScxQ42Xwr7ADgIx6sehGLLveVAAufew",
  authDomain: "pictures-10.firebaseapp.com",
  projectId: "pictures-10",
  storageBucket: "pictures-10.appspot.com",
  messagingSenderId: "153863460773",
  appId: "1:153863460773:web:ff5ab77314d4c2843c7a4c",
  measurementId: "G-1N947SLN61",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, storage, auth };
