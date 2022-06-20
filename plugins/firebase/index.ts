// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCWdMu7cIMwsYiMeotzUEOggoxBWZhfsJk",
	authDomain: "kibo-kanban.firebaseapp.com",
	projectId: "kibo-kanban",
	storageBucket: "kibo-kanban.appspot.com",
	messagingSenderId: "63412323864",
	appId: "1:63412323864:web:ac5a7964e19bad268d656d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
