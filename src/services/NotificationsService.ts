import { IResponseData } from "@/interfaces/IResponseData";
import api from "@/lib/api";
import { IMarkNotificationAsReadCommand } from "@/pages/api/notification/mark-as-read";

export async function fetchNotifications(userId: number) {
    try {
        const report = await fetch(
            api.concat("/api/notification/get-all?userId=" + userId),
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        const response = await report.json();

        return {
            success: true,
            message: "Relatório obtido com sucesso.",
            data: response.data,
        } as IResponseData;
    } catch (error) {
        return {
            success: false,
            message: "Erro ao obter o relatório.",
            data: null,
        } as IResponseData;
    }
}

export async function setNotificationRead(
    notificationId: number,
    userId: number
) {
    try {
        const report = await fetch(
            api.concat("/api/notification/mark-as-read"),
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
