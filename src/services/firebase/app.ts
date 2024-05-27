// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRuKfwSw3kRj1GWBDotFzycseWcJazwSE",
  authDomain: "mutual-web-34730.firebaseapp.com",
  projectId: "mutual-web-34730",
  storageBucket: "mutual-web-34730.appspot.com",
  messagingSenderId: "291820029464",
  appId: "1:291820029464:web:e88cc90765935b56e0656d",
  measurementId: "G-D4KFNTQG32",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
