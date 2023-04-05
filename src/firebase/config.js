// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
   apiKey: process.env.REACT_APP_FB_CONF_APIKEY,
   authDomain: process.env.REACT_APP_FB_CONF_AUTHDOMAIN,
   projectId: process.env.REACT_APP_FB_CONF_PROJECTID,
   storageBucket: process.env.REACT_APP_FB_CONF_STORAGEBUCKET,
   messagingSenderId: process.env.REACT_APP_FB_CONF_MESSAGINGSENDERID,
   appId: process.env.REACT_APP_FB_CONF_APPID,
   measurementId: process.env.REACT_APP_FB_CONF_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
