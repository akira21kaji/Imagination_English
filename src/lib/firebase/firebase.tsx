import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAc95tRTlJwcX8QVMLAHnbWQVJ5rcVYc_8",
  authDomain: "imagination-learning.firebaseapp.com",
  projectId: "imagination-learning",
  storageBucket: "imagination-learning.appspot.com",
  messagingSenderId: "210330961732",
  appId: "1:210330961732:web:24600c37449913b486b911",
  measurementId: "G-62BW7YYK87"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const firebaseServices = { auth, provider, db}
export default firebaseServices;