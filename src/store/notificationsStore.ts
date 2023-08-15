import { INotification } from "@/interfaces/notifications/INotification";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface NotificationStore {
    unreadNotifications: INotification[];
    readNotifications: INotification[];
    setUnreadNotifications: (notifications: INotification[]) => void;
    setReadNotifications: (notifications: INotification[]) => void;
}

export const useNotificationStore = create<NotificationStore>()(
    persist(
        set => ({
            unreadNotifications: [],
            readNotifications: [],
            setUnreadNotifications: notifications =>
                set({ unreadNotifications: notifications }),
            setReadNotifications: notifications =>
                set({ readNotifications: notifications }),
        }),
        {
            name: "notifications",
            storage: createJSONStorage(() => sessionStorage),
            skipHydration: true,
        }
    )
);
