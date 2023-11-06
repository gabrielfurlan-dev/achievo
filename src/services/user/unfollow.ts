import { IResponseData } from "@/interfaces/iResponseData";

export async function unfollowUser(userId: string, userIdToUnfollow: string): Promise<IResponseData> {
    const response = await fetch("/api/user/unfollow", {
        method: "DELETE",
        body: JSON.stringify({ userId, userIdToUnfollow }),
        headers: { "Content-Type": "application/json" },
    });

    return await response.json() as IResponseData;
}
