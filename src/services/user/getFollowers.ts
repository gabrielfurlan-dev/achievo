import { IResponseData } from "@/interfaces/iResponseData";

export async function getFollowers(userId: string): Promise<IResponseData> {
    try {
        const queryParams = new URLSearchParams({
            userId: userId,
        });

        const response = await fetch(`/api/user/get-followers?${queryParams.toString()}`);

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
            message: `Erro ao recuperar seguidores. Erro: ${error}`,
            data: null,
        } as IResponseData;
    }
}
