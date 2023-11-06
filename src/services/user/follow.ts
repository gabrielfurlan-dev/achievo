import { IResponseData } from "@/interfaces/iResponseData";

export async function followUser(userId: string, userIdToFollow: string): Promise<IResponseData> {
    const response = await fetch("/api/user/follow", {
        method: "POST",
        body: JSON.stringify({ userId, userIdToFollow }),
        headers: { "Content-Type": "application/json" },
    });

    return await response.json() as IResponseData;
}
