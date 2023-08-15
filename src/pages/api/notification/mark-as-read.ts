import { IResponseData } from "@/interfaces/iResponseData";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export interface IMarkNotificationAsReadCommand {
    userId: number;
    notificationId: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "PUT") {
        res.status(405).send({ message: "Somente métodos PUT são permitidos" });
        return;
    }

    try {
        const { userId, notificationId }: IMarkNotificationAsReadCommand =
            req.body;

        const alreadyRead = await db.readNotifications.findFirst({
            where: {
                userId: userId,
                notificationId: notificationId,
            },
        });

        if (!alreadyRead) {
            await db.readNotifications.create({
                data: {
                    userId: userId,
                    notificationId: notificationId,
                },
            });
        }

        return res.status(201).json({
            success: true,
            data: null,
            message: "Notificação lida com sucesso.",
        } as IResponseData);
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao maracar notificação como lida.",
            error: String(error),
        } as IResponseData);
    }
}
