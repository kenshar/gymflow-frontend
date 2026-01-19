import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiXMVvHStt2xc1YSLovNuBCyCBnwz9jIg",
  authDomain: "gymflow-184e8.firebaseapp.com",
  projectId: "gymflow-184e8",
  storageBucket: "gymflow-184e8.firebasestorage.app",
  messagingSenderId: "460958996011",
  appId: "1:460958996011:web:8da2455a051ca07293bc6e",
  measurementId: "G-L23F8P6RKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;
