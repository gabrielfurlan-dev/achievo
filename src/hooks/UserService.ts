
import { Firestore, doc, getDoc } from "firebase/firestore";
import db from '@/firebaseConfig';

export async function isUserRegistered(email: string) {
    try {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
        return false;
    }
}

export async function getUserData() {

    const email = localStorage.getItem('userEmail') ?? ""
    const name = localStorage.getItem('userName') ?? ""
    const photoUrl = localStorage.getItem('userPhotoURL') ?? ""

    return { userFound:name != "", email, name, photoUrl }
}
