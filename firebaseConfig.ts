import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import {getAuth, onAuthStateChanged} from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBniakJT_nebY2OBOkKrLlxMf9skD9GXMQ",
    authDomain: "todolisthabit.firebaseapp.com",
    projectId: "todolisthabit",
    storageBucket: "todolisthabit.appspot.com",
    messagingSenderId: "979217738804",
    appId: "1:979217738804:web:6695778ae834d84ce62e61",
    measurementId: "G-19E8KG6YJX"
  }

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
