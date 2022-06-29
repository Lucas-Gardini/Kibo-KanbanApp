import { collection, addDoc, getDocs, getDoc, query, where, WhereFilterOp, setDoc, doc, deleteDoc as delDoc, FieldPath } from "firebase/firestore";
import { db } from "./";

type Where = [string, WhereFilterOp, string];

async function createDoc(collectionName: string, data: Record<string, any>) {
	const docRef = await addDoc(collection(db, collectionName), {
		...data,
	});
	return docRef.id;
}

async function readDoc(collectionName: string, _where: Where) {
	const docRef = collection(db, collectionName);

	if (_where[0] === "id") {
		const document = doc(docRef, _where[2]);
		return (await getDoc(document)).data();
	} else {
		const q = query(docRef, where(_where[0], _where[1], _where[2]));
		const docs = await getDocs(q);
		return docs;
	}
}

async function updateDoc(collectionName: string, id: string, data: Record<string, any>) {
	const docRef = collection(db, collectionName);

	return await setDoc(doc(docRef, id), {
		...data,
	});
}

async function deleteDoc(collectionName: string, id: string) {
	const docRef = collection(db, collectionName);

	return await delDoc(doc(docRef, id));
}

export { createDoc, readDoc, updateDoc, deleteDoc };
