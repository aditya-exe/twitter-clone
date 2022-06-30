// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFireStore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "twitter-faac8.firebaseapp.com",
    projectId: "twitter-faac8",
    storageBucket: "twitter-faac8.appspot.com",
    messagingSenderId: "1017287241683",
    appId: "1:1017287241683:web:41f9809715ea15449ec926"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFireStore()
const storage = getStorage()

export { app, db, storage }