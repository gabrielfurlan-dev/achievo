import { IResponseData } from "@/interfaces/iResponseData";

export async function getAllFollowers(userId: string): Promise<IResponseData> {
    try {
        const queryParams = new URLSearchParams({ userId });
        const response = await fetch(`/api/follower/get-all-followers?${queryParams.toString()}`);

        if (!response.ok) {
            throw new Error("Failed to get followers");
        }

        const responseData = await response.json();

        return {
            success: true,
            message: "Seguidores recuperados com sucesso!",
            data: responseData.data,
        } as IResponseData;
    } catch (error) {
        return {
            success: false,
            message: "Erro ao recuperar seguidores",
            data: null,
        } as IResponseData;
    }
}
