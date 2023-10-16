import { IResponseData } from "@/interfaces/iResponseData";

export async function searchUsers(userId: string): Promise<IResponseData> {
    try {
        const response = await fetch(`/api/user/search?userId=${userId}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Failed to search users");
        }

        const responseData = await response.json();

        return {
            success: true,
            message: "Users retrieved successfully.",
            data: responseData.data,
        } as IResponseData;
    } catch (error) {
        return {
            success: false,
            message: "Error while retrieving the list of users.",
            data: null,
        } as IResponseData;
    }
}
