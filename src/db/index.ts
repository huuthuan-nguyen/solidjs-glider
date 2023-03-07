// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "@firebase/auth";
import {collection, getDocs, getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB7Bg9zOGTnYiKgvJAeuWLjWfXsQDYjneE",
    authDomain: "glider-app-9c691.firebaseapp.com",
    projectId: "glider-app-9c691",
    storageBucket: "glider-app-9c691.appspot.com",
    messagingSenderId: "829517714602",
    appId: "1:829517714602:web:a7f16dd6c687977865acd3",
    measurementId: "G-G2MY06HZST"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore();
export const firebaseAuth = getAuth(app);