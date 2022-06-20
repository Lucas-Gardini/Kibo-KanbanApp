import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./";

type LoginTypes = "email" | "google";

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

async function logout() {
	return await auth.signOut();
}

function getUser() {
	return auth.currentUser;
}

export { register, login, logout, getUser };
