import { create } from 'zustand';

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

const useNotificationStore = create<NotificationStore>((set) => ({
    unreadNotifications: [],
    readNotifications: [],
    setUnreadNotifications: (notifications) => set({ unreadNotifications: notifications }),
    setReadNotifications: (notifications) => set({ readNotifications: notifications }),
}));

export default useNotificationStore;
