import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD13wtZQB51ctZBLTFsYGMgGGYBUPqL-_Y",
  authDomain: "listajogos-8734d.firebaseapp.com",
  projectId: "listajogos-8734d",
  storageBucket: "listajogos-8734d.appspot.com",
  messagingSenderId: "43089347971",
  appId: "1:43089347971:web:13ae801f6445c8fad822b6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
