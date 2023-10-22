import { IResponseData } from "@/interfaces/iResponseData";

export async function unfollowUser(userId: string, userIdToUnfollow: string): Promise<IResponseData> {
    try {
        const response = await fetch("/api/user/unfollow", {
            method: "DELETE",
            body: JSON.stringify({ userId, userIdToUnfollow }),
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to unfollow user");
        }

        return {
            success: true,
            message: "Deixou de seguir com sucesso!",
            data: null,
        } as IResponseData;
    } catch (error) {
        return {
            success: false,
            message: "Erro ao deixar de seguir o usuário",
            data: null,
        } as IResponseData;
    }
}
