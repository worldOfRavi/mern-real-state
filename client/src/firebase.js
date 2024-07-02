// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-82537.firebaseapp.com",
  projectId: "mern-estate-82537",
  storageBucket: "mern-estate-82537.appspot.com",
  messagingSenderId: "290030238273",
  appId: "1:290030238273:web:0894dbe4a471dfb907e4c0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);