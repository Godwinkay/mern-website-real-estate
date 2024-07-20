
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-project-5fb8c.firebaseapp.com",
  projectId: "mern-project-5fb8c",
  storageBucket: "mern-project-5fb8c.appspot.com",
  messagingSenderId: "484502118024",
  appId: "1:484502118024:web:9df099e9c45684c6ffc93d"
};


export const app = initializeApp(firebaseConfig);