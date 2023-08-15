/*
  Warnings:

  - The primary key for the `CheckGoal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProgressGoal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ReadNotifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Report` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CheckGoal" DROP CONSTRAINT "CheckGoal_reportId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressGoal" DROP CONSTRAINT "ProgressGoal_reportId_fkey";

-- DropForeignKey
ALTER TABLE "ReadNotifications" DROP CONSTRAINT "ReadNotifications_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "ReadNotifications" DROP CONSTRAINT "ReadNotifications_userId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_checkGoalId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_progressGoalId_fkey";

-- AlterTable
ALTER TABLE "CheckGoal" DROP CONSTRAINT "CheckGoal_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "reportId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "CheckGoal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProgressGoal" DROP CONSTRAINT "ProgressGoal_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "reportId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "ProgressGoal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ReadNotifications" DROP CONSTRAINT "ReadNotifications_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "userId" SET DATA TYPE BIGINT,
ALTER COLUMN "notificationId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "ReadNotifications_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Report" DROP CONSTRAINT "Report_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "userId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Report_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "progressGoalId" SET DATA TYPE BIGINT,
ALTER COLUMN "checkGoalId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ReadNotifications" ADD CONSTRAINT "ReadNotifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadNotifications" ADD CONSTRAINT "ReadNotifications_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressGoal" ADD CONSTRAINT "ProgressGoal_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckGoal" ADD CONSTRAINT "CheckGoal_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_progressGoalId_fkey" FOREIGN KEY ("progressGoalId") REFERENCES "ProgressGoal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_checkGoalId_fkey" FOREIGN KEY ("checkGoalId") REFERENCES "CheckGoal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
