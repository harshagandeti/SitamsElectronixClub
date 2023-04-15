import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCbVSg17N16B-luur9vyQvNePJyVNCax5o",
  authDomain: "sitams-electronix-club-db.firebaseapp.com",
  projectId: "sitams-electronix-club-db",
  storageBucket: "sitams-electronix-club-db.appspot.com",
  messagingSenderId: "269794975720",
  appId: "1:269794975720:web:33f5e7dffeee623e3c8e5d",
  measurementId: "G-GCHS3SXD4Q"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const Storage = getStorage(app);
export const auth = getAuth(app);

// const firebaseConfig = {
//   apiKey: "<SOME_Key>",
//   authDomain: "<SOME_Key>",
//   projectId: "<SOME_Key>",
//   storageBucket: "<SOME_Key>",
//   messagingSenderId: "<SOME_Key>",
//   appId: "<SOME_Key>"
// };
