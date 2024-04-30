import { INotificationData } from "@/interfaces/notifications/iNotificationData";
import {
    fetchNotifications,
    setNotificationRead,
} from "@/services/notificationsService";
import { useNotificationStore } from "@/store/notificationsStore";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { useEffect } from "react";

export type NotificationProps = {
    id: number;
    title: string;
    message: string;
    wikiURL: string;
    isUnred?: boolean;
    updatedTime: string;
};

export function NotificationItem({
    id,
    title,
    message,
    isUnred,
    wikiURL,
    updatedTime,
}: NotificationProps) {
    const { userInfo } = useUserInfoStore();
    const { setAllNotifications, setUnreadNotifications } =
        useNotificationStore();

    async function setReadNotification(notificationId: number) {
        await setNotificationRead(notificationId, userInfo.id);

        getNotifications();
    }

    useEffect(() => {
        getNotifications();
    }, []);

    async function getNotifications() {
        try {
            const result = await fetchNotifications(userInfo.id);
            const { unreadNotifications, allNotifications } =
                result.data as INotificationData;

            setAllNotifications(allNotifications);
            setUnreadNotifications(unreadNotifications);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    }

    return (
        <div className="w-full">
            {isUnred ? (
                <a
                    href={wikiURL}
                    onClick={() => setReadNotification(id)}
                    target="_blank"
                    className="pointer"
                    rel="noreferrer"
                >
                    <div
                        key={id}
                        className=" bg-LIGHT_PRINCIPAL_SECONDARY dark:bg-DARK_PRINCIPAL_SECONDARY
                                    text-LIGHT_TEXT dark:text-DARK_TEXT
                                    hover:bg-PRINCIPAL hover:dark:bg-PRINCIPAL
                                    hover:text-WHITE_PRINCIPAL
                                    rounded-lg py-2 px-4 mb-2 transition duration-150"
                    >
                        <div className="flex flex-row justify-between pb-2">
                            <h4 className="font-semibold line-clamp-1 text-base">
                                {title}
                            </h4>
                            <div className="w-3/6 flex items-center justify-end">
                                <p className="text-xs font-light line-clamp-1 ">
                                    {updatedTime}
                                </p>
                            </div>
                        </div>
                        <p className="line-clamp-3">{message}</p>
                    </div>
                </a>
            ) : (
                <a
                    href={wikiURL}
                    target="_blank"
                    className="pointer"
                    rel="noreferrer"
                >
                    <div
                        key={id}
                        className=" bg-LIGHT_BACKGROUND_SECONDARY dark:bg-DARK_BACKGROUND
                                    text-LIGHT_TEXT dark:text-DARK_TEXT
                                    hover:bg-LIGHT_BACKGROUND_TERTIARY hover:dark:bg-DARK_BACKGROUND_TERTIARY
                                    hover:text-GRAY_DARK hover:dark:text-WHITE_PRINCIPAL
                                    rounded-lg py-2 px-4 mb-2 transition duration-150"
                    >
                        <div className="flex flex-row justify-between pb-2">
                            <h4 className="font-semibold line-clamp-1">
                                {title}
                            </h4>
                            <div className="w-3/6 flex items-center justify-end">
                                <p className="text-xs font-light line-clamp-1 ">
                                    {updatedTime}
                                </p>
                            </div>
                        </div>
                        <p className="line-clamp-3">{message}</p>
                    </div>
                </a>
            )}
        </div>
    );
}
