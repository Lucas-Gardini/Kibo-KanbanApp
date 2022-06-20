import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import app from "./index";

type LoginTypes = "email" | "google";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
	if (user) {
		console.log(user);
	} else {
	}
});

async function register(email: string, password: string) {
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			console.log(user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorMessage);
		});
}

async function login(type: LoginTypes, email?: string, password?: string) {
	switch (type) {
		case "email":
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					console.log(user);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(errorMessage);
				});
			break;
		case "google":
			// ...
			break;
	}
}

export { register, login };
