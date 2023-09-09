import { IUpdateUserCommand } from "@/pages/api/user/update";
import { doc, getDoc } from "firebase/firestore";
import db from "@/firebaseConfig";
import { IUserInfo } from "@/store/userStoreInfo";
import { IResponseData } from "@/interfaces/iResponseData";
import variables from "@/schemas/env-variables";

export async function getUserData(email: string) {
    try {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        const id = docSnap.id;
        const userData = (await docSnap.data()) as IUserInfo;

        return {
            success: true,
            data: {
                ...userData,
                id: id,
            },
        };
    } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
        return { success: false, data: null };
    }
}

export async function updateUser(id: string, name: string, username: string, description: string) {
    const responseData = await fetch("/api/user/update",
        {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                name: name,
                username: username,
                description: description
            } as IUpdateUserCommand),
            headers: { "Content-Type": "application/json" },
        }
    )

    const response = await responseData.json();
    console.log(response)

    return response.success;
}

export async function registerUser(name: string, email: string, photoURL: string) {
    const response = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            email: email,
            imageURL: photoURL,
        }),
        headers: { "Content-Type": "application/json" },
    });

    return (await response.json()) as IResponseData;
}

export async function userExists(email: string) {
    const response = await fetch(`api/user/exists/?email=${email}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    return (await response.json()) as IResponseData;
}
