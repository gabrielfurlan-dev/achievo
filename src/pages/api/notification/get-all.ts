import { IResponseData } from "@/interfaces/IResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).send({ message: "Somente métodos GET são permitidos" });
        return;
    }

    const userId = Number(req.query.userId);

    try {
        const readNotificationIds = await db.readNotifications.findMany({
            select: {
                notificationId: true,
            },
            where: {
                userId: userId,
            },
        });

        const readNotifications = await db.notification.findMany({
            where: {
                id: {
                    in: readNotificationIds.map(
                        readNotification => readNotification.notificationId
                    ),
                },
            },
        });

        const unreadNotifications = await db.notification.findMany({
            where: {
                id: {
                    not: {
                        in: readNotificationIds.map(
                            readNotification => readNotification.notificationId
                        ),
                    },
                },
            },
        });

        return res.status(201).json({
            success: true,
            data: { unreadNotifications, readNotifications },
            message: "Notificações obtidas com sucesso!",
        } as IResponseData);
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao obter as notificações",
            error: String(error),
        } as IResponseData);
    }
}
