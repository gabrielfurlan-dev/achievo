import { INotification } from "./iNotification";

export interface INotificationData {
    readNotifications: INotification[];
    unreadNotifications: INotification[];
}
