
import { doc, getDoc } from "firebase/firestore";
import db from '@/firebaseConfig';
import { IUserInfo } from "@/store/userStoreInfo";

export async function isUserRegistered(email: string) {

    const data = await getRegisteredData(email)

    return data?.description != ""
}

export async function getRegisteredData(email: string) {
    try {
        const docRef = doc(db, "users/" + email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as IUserInfo
        } else {
            console.log("Documento não encontrado!");
        }
    } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
    }
}

export async function getUserData(userInfo: IUserInfo) {

    const email = userInfo.email ?? ""
    const name = userInfo.name ?? ""
    const imageURL = userInfo.imageURL ?? ""

    return { userFound: name != "", email, name, imageURL }
}
