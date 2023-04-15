import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDrSGslXF_U-B84gD45EYKQyPHuLvOnS0M",
  authDomain: "sitamselectronixclub-database.firebaseapp.com",
  projectId: "sitamselectronixclub-database",
  storageBucket: "sitamselectronixclub-database.appspot.com",
  messagingSenderId: "162971995495",
  appId: "1:162971995495:web:a7a4beaa160373879eb3c2",
  measurementId: "G-851K9DBPG7"
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
