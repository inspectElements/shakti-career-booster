import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBrDbrdgobv--BI7EhyzpyLaz2WHxbVkoc",
    authDomain: "shakti-29526.firebaseapp.com",
    projectId: "shakti-29526",
    storageBucket: "shakti-29526.appspot.com",
    messagingSenderId: "306446778774",
    appId: "1:306446778774:web:fe48bdee90e21459ea9db7",
    measurementId: "G-0FTXVPYQ4B"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
