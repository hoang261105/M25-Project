// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzV9tkfzjcZY9VNb7jPe3FQZSe8-v_8Hc",
  authDomain: "project-m25-338d2.firebaseapp.com",
  projectId: "project-m25-338d2",
  storageBucket: "project-m25-338d2.appspot.com",
  messagingSenderId: "613153988726",
  appId: "1:613153988726:web:cde531a90062fd87c37f57",
  measurementId: "G-JT1ECP4NKS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
