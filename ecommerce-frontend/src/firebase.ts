import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTED,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// VITE_FIREBASE_APIKEY="AIzaSyCB1jeLf0NiKDobeuL5EUNUKrUWFzOFHic",
// VITE_FIREBASE_AUTHDOMAIN="pleasure-yourself-2024.firebaseapp.com",
// VITE_FIREBASE_PROJECTID="pleasure-yourself-2024",
// VITE_FIREBASE_STORAGEBUCKET="pleasure-yourself-2024.appspot.com",
// VITE_FIREBASE_MESSAGINGID="185278533723",
// VITE_FIREBASE_APPID="1:185278533723:web:4976fc86da6a0a76766f7e",
// VITE_FIREBASE_MEASUREMENTID="G-P01BDBL7P4",

console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_APIKEY);
console.log("Firebase Auth Domain:", import.meta.env.VITE_FIREBASE_AUTHDOMAIN);
console.log("Firebase Project ID:", import.meta.env.VITE_FIREBASE_PROJECTID);
console.log(
  "Firebase Storage Bucket:",
  import.meta.env.VITE_FIREBASE_STORAGEBUCKET
);
console.log(
  "Firebase Messaging Sender ID:",
  import.meta.env.VITE_FIREBASE_MESSAGINGID
);
console.log("Firebase App ID:", import.meta.env.VITE_FIREBASE_APPID);
console.log(
  "Firebase Measurement ID:",
  import.meta.env.VITE_FIREBASE_MEASUREMENTID
);
