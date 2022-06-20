import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCWdMu7cIMwsYiMeotzUEOggoxBWZhfsJk",
	authDomain: "kibo-kanban.firebaseapp.com",
	projectId: "kibo-kanban",
	storageBucket: "kibo-kanban.appspot.com",
	messagingSenderId: "63412323864",
	appId: "1:63412323864:web:ac5a7964e19bad268d656d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

export default null;
