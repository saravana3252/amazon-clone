import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyB0zLoph-s50hR9ksupfsE3nUdPcuAEHrQ",
  authDomain: "clone-c693e.firebaseapp.com",
  projectId: "clone-c693e",
  storageBucket: "clone-c693e.firebasestorage.app",
  messagingSenderId: "56400518111",
  appId: "1:56400518111:web:1975ec657f5e04c5bf426a",
  measurementId: "G-LNBCG7PX0K"
};


const app = initializeApp(firebaseConfig);
const auth =getAuth(app)

export default auth
