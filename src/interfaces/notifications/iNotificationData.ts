import { INotification } from "./iNotification";

export interface INotificationData {
    allNotifications: INotification[];
    unreadNotifications: INotification[];
}
