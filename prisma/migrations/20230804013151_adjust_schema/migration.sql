/*
  Warnings:

  - You are about to drop the column `user_NotificationId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the `User_Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_user_NotificationId_fkey";

-- DropForeignKey
ALTER TABLE "User_Notification" DROP CONSTRAINT "User_Notification_userId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "user_NotificationId";

-- DropTable
DROP TABLE "User_Notification";

-- CreateTable
CREATE TABLE "ReadNotifications" (
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "notificationId" INTEGER NOT NULL,

    CONSTRAINT "ReadNotifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReadNotifications" ADD CONSTRAINT "ReadNotifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadNotifications" ADD CONSTRAINT "ReadNotifications_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
