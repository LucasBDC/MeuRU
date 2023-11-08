// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCpGQArbOdo6KRFyHkTQLy_Q7qe25RBQSA",
  authDomain: "myru-efdc1.firebaseapp.com",
  projectId: "myru-efdc1",
  storageBucket: "myru-efdc1.appspot.com",
  messagingSenderId: "951089909307",
  appId: "1:951089909307:web:446edce24b7f970408161e",
  measurementId: "G-NELSF7NW6X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


provider.addScope('https://www.googleapis.com/auth/contacts.readonly');