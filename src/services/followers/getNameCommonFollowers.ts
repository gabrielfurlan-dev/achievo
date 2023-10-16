import { IResponseData } from "@/interfaces/iResponseData";

export async function getNamesCommonFollowers(userId: string, userIdToCompare: string): Promise<IResponseData> {
    try {
        const queryParams = new URLSearchParams({ userId, userIdToCompare });
        const response = await fetch(`/api/follower/get-names-common-followers?${queryParams.toString()}`);

        if (!response.ok) {
            throw new Error("Failed to get names of common followers");
        }

        const responseData = await response.json();

        return {
            success: true,
            message: "Nomes dos seguidores em comum recuperados com sucesso!",
            data: responseData.data,
        } as IResponseData;
    } catch (error) {
        return {
            success: false,
            message: "Erro ao recuperar nomes dos seguidores em comum",
            data: null,
        } as IResponseData;
    }
}
