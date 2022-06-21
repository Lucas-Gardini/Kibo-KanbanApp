import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from "./";

export type LoginTypes = "email" | "google";

onAuthStateChanged(auth, (user) => {
	if (user) {
		console.log(user);
	} else {
	}
});

auth.useDeviceLanguage();

const gProvider = new GoogleAuthProvider();

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
			try {
				const userCredential = await signInWithEmailAndPassword(auth, email, password);
				return userCredential;
			} catch (error) {
				const errorMessage = error.message;
				return errorMessage;
			}

		case "google":
			try {
				const result = await signInWithPopup(auth, gProvider);
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				return token;
			} catch (error) {
				const errorMessage = error.message;
				return errorMessage;
			}
	}
}

async function logout() {
	await auth.signOut();
	return navigateTo("/dashboard/login");
}

function getUser() {
	return auth.currentUser;
}

export { register, login, logout, getUser };
