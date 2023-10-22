import { IResponseData } from "@/interfaces/iResponseData";

export async function getFollowers(userId: string): Promise<IResponseData> {
    try {
        const response = await fetch(`/api/user/get-followers?${userId}`);

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
