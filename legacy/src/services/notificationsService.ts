import { IResponseData } from "@/interfaces/iResponseData";
import { IMarkNotificationAsReadCommand } from "@/pages/api/notification/mark-as-read";

export async function fetchNotifications(userId: string): Promise<Omit<IResponseData, "error">> {
    try {

        const queryParams = new URLSearchParams({
            userId: userId,
            take: "5",
            skip: "0",
        });

        const notifications = await fetch(`/api/notification/get?${queryParams.toString()}`);

        const response = await notifications.json();

        return {
            success: true,
            message: "Relatório obtido com sucesso.",
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: "Erro ao obter o relatório.",
            data: null,
        };
    }
}

export async function setNotificationRead(notificationId: number, userId: string): Promise<IResponseData> {
    try {
        const report = await fetch("/api/notification/mark-as-read",
            {
                method: "PUT",
                body: JSON.stringify({
                    notificationId: notificationId,
                    userId: userId,
                } as IMarkNotificationAsReadCommand),
                headers: { "Content-Type": "application/json" },
            }
        );

        const response = await report.json();

        if (!response.success) throw Error;

        return {
            success: true,
            message: "Notificação lida com sucesso.",
            data: response.data,
        } as IResponseData;
    } catch (error) {
        return {
            success: false,
            message: "Erro ao marcar notificação como lida.",
            data: null,
        } as IResponseData;
    }
}
