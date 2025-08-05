import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDRqY_BJ_1eX8DIO2ZiIfZ1wUqjVkqN--s",
  authDomain: "class-exercise-ee57b.firebaseapp.com",
  projectId: "class-exercise-ee57b",
  storageBucket: "class-exercise-ee57b.firebasestorage.app",
  messagingSenderId: "932691900321",
  appId: "1:932691900321:web:04bc754c70998c424f7de0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
