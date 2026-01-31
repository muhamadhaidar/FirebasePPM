// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBf9rQhiZz1dxkDlrELFA7PH9k6GtDMDSw",
    authDomain: "fir-app-50c2b.firebaseapp.com",
    projectId: "fir-app-50c2b",
    storageBucket: "fir-app-50c2b.firebasestorage.app",
    messagingSenderId: "168976311126",
    appId: "1:168976311126:web:e4acb3efae78cae7376cf7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
import { getFirestore } from "firebase/firestore";
export const db = getFirestore(app);