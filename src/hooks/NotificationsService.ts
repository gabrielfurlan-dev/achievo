import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import firestore from "../firebaseConfig";
import db from "../firebaseConfig";

export interface INotification {
    id: string;
    title: string;
    message: string;
    wikiURL: string;
    timestamp: number;
}

interface UserNotifications {
    readNotifications: string[];
}

export async function fetchNotifications(userEmail: string) {
    try {
        const snapshot = await getDocs(collection(firestore, "notifications"));
        const notificationsData: INotification[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data() as Omit<INotification, 'id'>
        }));

        const userNotificationsRef = doc(firestore, "user_notifications", userEmail);
        const docSnap = await getDoc(userNotificationsRef);

        if (docSnap.exists()) {
            const data = docSnap.data() as UserNotifications;
            const readNotificationsData: string[] = data.readNotifications ?? [];
            const unreadNotificationsData: INotification[] = notificationsData.filter(
                (notification) => !readNotificationsData.includes(notification.id)
            );
            return { unreadNotifications: unreadNotificationsData, readNotifications: notificationsData.filter((notification) => readNotificationsData.includes(notification.id)) };
        } else {
            return { unreadNotifications: [], readNotifications: notificationsData };
        }
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return { unreadNotifications: [], readNotifications: [] };
    }
}

export async function setNotificationRead(idNotification: string, userEmail: string) {
    try {
        const docRef = doc(db, "user_notifications/" + userEmail);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const readNotifications = Array.isArray(data.readNotifications) ? data.readNotifications : [];

            if (!readNotifications.find((x) => x.idNotification)) {

                readNotifications.push(idNotification);

                await updateDoc(docRef, { readNotifications });

                return { data: "Notificação marcada como lida.", error: "", type: 'success' };
            }

            return { data: "Notificação marcada como lida.", error: "", type: 'success' };
        } else {
            return { data: "Documento de notificações do usuário não encontrado.", error: "", type: 'error' };
        }
    } catch (error) {
        return { data: "Erro ao marcar notificação como lida:", error: String(error), type: "error" };
    }
}
