/*
  Warnings:

  - The primary key for the `User_Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User_Notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_user_NotificationId_fkey";

-- AlterTable
ALTER TABLE "User_Notification" DROP CONSTRAINT "User_Notification_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_Notification_pkey" PRIMARY KEY ("userId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_NotificationId_fkey" FOREIGN KEY ("user_NotificationId") REFERENCES "User_Notification"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
