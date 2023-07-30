
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from '@/firebaseConfig';
import { IUserInfo } from "@/store/userStoreInfo";

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

export async function getUserData(email: string) {
    try {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        const id = docSnap.id;
        const userData = await docSnap.data() as IUserInfo;

        return {
            success: true, data: {
                ...userData,
                id: id
            }
        };

    } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
        return { success: false, data: null };
    }
}

export async function registerUser(userData: IUserInfo) {
    try {
        const docId = userData.email ?? "none";

        await setDoc(doc(db, "users", docId), userData);
        await setDoc(doc(db, "user_notifications", docId), { readNotifications: [] });

        return { data: "Usuário registrado com sucesso!", error: "", type: 'success' };
    } catch (error) {
        return { data: "Erro ao registrar o usuário", error: String(error), type: "error" };
    }
}
