// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyDnbP2olEJ99MrilnBLa6eF0mexmqvOwKg",
   authDomain: "x-career-05-project-final.firebaseapp.com",
   projectId: "x-career-05-project-final",
   storageBucket: "x-career-05-project-final.appspot.com",
   messagingSenderId: "463457213578",
   appId: "1:463457213578:web:a97c65c382ee05b991a173",
   measurementId: "G-72NCEEYJZC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
