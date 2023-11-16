// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: "community-auth-5d61e.firebaseapp.com",
  projectId: "community-auth-5d61e",
  storageBucket: "community-auth-5d61e.appspot.com",
  messagingSenderId: "810860372738",
  appId: "1:810860372738:web:9e54d8d145a1a20725181b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
