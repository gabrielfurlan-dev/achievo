import { INotification } from "./INotification";

export interface INotificationData {
    readNotifications: INotification[],
    unreadNotifications: INotification[],
}

