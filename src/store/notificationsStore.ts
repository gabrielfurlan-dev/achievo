import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Notification {
    id: string;
    title: string;
    message: string;
    wikiURL: string;
    timestamp: number;
}

interface NotificationStore {
    unreadNotifications: Notification[];
    readNotifications: Notification[];
    setUnreadNotifications: (notifications: Notification[]) => void;
    setReadNotifications: (notifications: Notification[]) => void;
}

export const useNotificationStore = create<NotificationStore>()(
    persist(
        (set) => ({
            unreadNotifications: [],
            readNotifications: [],
            setUnreadNotifications: (notifications) => set({ unreadNotifications: notifications }),
            setReadNotifications: (notifications) => set({ readNotifications: notifications }),
        }),
        {
            name: "notifications",
            storage: createJSONStorage(() => sessionStorage),
            skipHydration: true,
        }
    ));
