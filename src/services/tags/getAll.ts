import { IResponseData } from "@/interfaces/iResponseData";

export async function getAll(userId: string){

    const queryParams = new URLSearchParams({
        userId: userId,
    });

    const response = await fetch(`/api/tag/get-all?${queryParams.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    return await response.json() as IResponseData;
}
