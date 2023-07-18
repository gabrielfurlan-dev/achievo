
import { doc, getDoc } from "firebase/firestore";
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

export async function getRegisterData(email: string) {
    try {

        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        return docSnap.data() as IUserInfo;
        console.log(docSnap)

    } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
        return false;
    }
}

export async function getUserData(userInfo: IUserInfo) {

    const email = userInfo.email ?? ""
    const name = userInfo.name ?? ""
    const imageURL = userInfo.imageURL ?? ""

    return { userFound: name != "", email, name, imageURL }
}
