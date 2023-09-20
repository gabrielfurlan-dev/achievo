import { IUpdateUserCommand } from "@/pages/api/user/update";
import { IResponseData } from "@/interfaces/iResponseData";


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

export async function usernameAlradyTaken(username: string) {
    const response = await fetch(`api/user/username-taken/?username=${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    return (await response.json()) as IResponseData;
}

