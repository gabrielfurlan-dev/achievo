import { INotification } from "@/interfaces/notifications/iNotification";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface NotificationStore {
    unreadNotifications: INotification[];
    allNotifications: INotification[];
    setUnreadNotifications: (notifications: INotification[]) => void;
    setAllNotifications: (notifications: INotification[]) => void;
}

export const useNotificationStore = create<NotificationStore>()(
    persist(
        set => ({
            unreadNotifications: [],
            allNotifications: [],
            setUnreadNotifications: notifications =>
                set({ unreadNotifications: notifications }),
            setAllNotifications: notifications =>
                set({ allNotifications: notifications }),
        }),
        {
            name: "notifications",
            storage: createJSONStorage(() => sessionStorage),
            skipHydration: true,
        }
    )
);
