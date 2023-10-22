import { IResponseData } from "@/interfaces/iResponseData";

export async function followUser(userId: string, userIdToFollow: string): Promise<IResponseData> {
    try {
        const response = await fetch("/api/user/follow", {
            method: "POST",
            body: JSON.stringify({ userId, userIdToFollow }),
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to follow user");
        }

        const responseData = await response.json();

        return {
            success: true,
            message: "Seguindo com sucesso!",
            data: responseData.data,
        } as IResponseData;
    } catch (error) {
        return {
            success: false,
            message: "Erro ao seguir o usuário",
            data: null,
        } as IResponseData;
    }
}
