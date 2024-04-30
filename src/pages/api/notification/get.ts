import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";
import { INotification } from "@/interfaces/notifications/iNotification";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res
            .status(405)
            .send({ message: "Somente métodos GET são permitidos" });
    }

    const userId = req.query.userId as string;
    const take = parseInt(req.query.take as string) || 5;
    const skip = parseInt(req.query.skip as string) || 0;

    try {
        const notifications = await db.notification.findMany({
            take,
            skip,
            orderBy: {
                createdDate: "desc"
            }
        });

        const readNotificationIds = await db.readNotifications.findMany({
            select: {
                notificationId: true,
            },
            where: {
                userId,
            },
            take,
            skip,
        });

        const allNotifications: INotification[] = notifications.map(
            notification => {
                const { id, createdDate, message, title, wikiURL } =
                    notification;
                const isRead = readNotificationIds.some(
                    read => read.notificationId === id
                );

                return {
                    id,
                    createdDate: createdDate.toString(),
                    message,
                    title,
                    wikiURL,
                    isRead,
                };
            }
        );

        const unreadNotifications = allNotifications.filter(
            notif => !notif.isRead
        );

        return res.status(201).json({
            success: true,
            data: { allNotifications, unreadNotifications },
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
