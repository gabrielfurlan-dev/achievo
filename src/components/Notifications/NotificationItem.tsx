import { INotificationData } from "@/interfaces/notifications/iNotificationData";
import {
    fetchNotifications,
    setNotificationRead,
} from "@/services/notificationsService";
import { useNotificationStore } from "@/store/notificationsStore";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { useEffect } from "react";
import { tv } from "tailwind-variants";

export type NotificationProps = {
    id: number;
    title: string;
    message: string;
    wikiURL: string;
    isUnread?: boolean;
    timeElasped: string;
};

export function NotificationItem({
    id,
    title,
    message,
    isUnread,
    wikiURL,
    timeElasped,
}: NotificationProps) {
    const { userInfo } = useUserInfoStore();
    const { setAllNotifications, setUnreadNotifications } = useNotificationStore();

    const notificationItemStyle = tv({
        base: "rounded-lg py-2 px-4 mb-2 transition duration-150 text-LIGHT_TEXT dark:text-DARK_TEXT",
        variants: {
            unread: {
                true: "bg-LIGHT_PRINCIPAL_SECONDARY dark:bg-DARK_PRINCIPAL_SECONDARY hover:bg-PRINCIPAL hover:dark:bg-PRINCIPAL hover:text-WHITE_PRINCIPAL",
                false: "bg-LIGHT_BACKGROUND_SECONDARY dark:bg-DARK_BACKGROUND hover:bg-LIGHT_BACKGROUND_TERTIARY hover: dark: bg - DARK_BACKGROUND_TERTIARY hover:text-GRAY_DARK hover:dark:text-WHITE_PRINCIPAL"
            }
        }
    })

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
            {
                <a
                    href={wikiURL}
                    onClick={() => setReadNotification(id)}
                    target="_blank"
                    className="pointer"
                    rel="noreferrer"
                >
                    <div key={id} className={notificationItemStyle({ unread: isUnread })}>
                        <div className="flex flex-row justify-between pb-2">
                            <span className="font-semibold line-clamp-1 w-full text-base">{title}</span>
                            <p className="text-xs font-light min-w-fit line-clamp-1 text-end">{timeElasped}</p>
                        </div>
                        <p className="line-clamp-3">{message}</p>
                    </div>
                </a>
            }
        </div>
    );
}
