import { IResponseData } from "@/interfaces/iResponseData";

export async function getAll(){
    const response = await fetch("/api/colors/get-all", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    return await response.json() as IResponseData;
}
