// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore} from "firebase/firestore" 
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDhFrapbO3fdv7ZdolTIY_nY3bF5IRjgXE",
  authDomain: "easytrip-grupo10.firebaseapp.com",
  projectId: "easytrip-grupo10",
  storageBucket: "easytrip-grupo10.appspot.com",
  messagingSenderId: "555673218332",
  appId: "1:555673218332:web:1f0c072b0b2c473e681ed9",
  measurementId: "G-NVPHB658VP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

