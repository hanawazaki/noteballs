import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-9n7CQFtgL2KkbvqTG6lik_uTUAVKOHc",
  authDomain: "han-noteapp.firebaseapp.com",
  projectId: "han-noteapp",
  storageBucket: "han-noteapp.appspot.com",
  messagingSenderId: "451784574606",
  appId: "1:451784574606:web:aecea070b13cafe1d72bdf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

export {
  db, auth
}