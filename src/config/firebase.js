// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDILgvSK5AfeQxDUpv4dE-aq0UfjIRhA2E",
  authDomain: "hotel-app-32b4b.firebaseapp.com",
  projectId: "hotel-app-32b4b",
  storageBucket: "hotel-app-32b4b.appspot.com",
  messagingSenderId: "780544137175",
  appId: "1:780544137175:web:619d0ea014d8cc8cb7dd92",
  measurementId: "G-B840331HJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const analytics = getAnalytics(app);
const storage = getStorage(app)

export {auth, db, storage}