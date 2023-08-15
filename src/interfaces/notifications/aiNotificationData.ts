import { INotification } from "./aiNotification";

export interface INotificationData {
    readNotifications: INotification[];
    unreadNotifications: INotification[];
}
