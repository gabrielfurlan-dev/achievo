import { setNotificationRead } from "@/hooks/NotificationsService";
import { useUserInfoStore } from "@/store/userStoreInfo";

type NotificationProps = {
    id: string,
    title: string,
    message: string,
    wikiURL: string,
    isUnred?: boolean,
    updateNotifications: () => void
}


export function NotificationItem({ id, title, message, isUnred, wikiURL, updateNotifications }: NotificationProps) {
    const { userInfo } = useUserInfoStore()

    async function setReadNotification(idNotification: string) {
        await setNotificationRead(idNotification, userInfo.email ?? "none");
        updateNotifications();
    }

    return (
        <div className="w-full">
            {isUnred ? (
                <a href={wikiURL} onClick={() => setReadNotification(id)} target="_blank" className="pointer">
                    <div
                        key={id}
                        className=" bg-LIGHT_PRINCIPAL_SECONDARY dark:bg-DARK_PRINCIPAL_SECONDARY
                                    text-LIGHT_TEXT dark:text-DARK_TEXT
                                    hover:bg-PRINCIPAL hover:dark:bg-PRINCIPAL
                                    hover:text-WHITE_PRINCIPAL
                                    rounded-lg py-2 px-4 mb-2 transition duration-150"
                    >
                        <h4 className="font-semibold mb-2">{title}</h4>
                        <p>{message}</p>
                    </div>
                </a>

            ) : (

                <a href={wikiURL} target="_blank" className="pointer">
                    <div
                        key={id}
                        className=" bg-LIGHT_BACKGROUND_SECONDARY dark:bg-DARK_BACKGROUND
                                    text-LIGHT_TEXT dark:text-DARK_TEXT
                                    hover:bg-LIGHT_BACKGROUND_TERTIARY hover:dark:bg-DARK_BACKGROUND_TERTIARY
                                    hover:text-GRAY_DARK hover:dark:text-WHITE_PRINCIPAL
                                    rounded-lg py-2 px-4 mb-2 transition duration-150"
                    >
                        <h4>{title}</h4>
                        <p>{message}</p>
                    </div>
                </a>
            )
            }
        </div>
    );
}
