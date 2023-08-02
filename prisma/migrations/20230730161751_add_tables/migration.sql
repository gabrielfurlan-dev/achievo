/*
  Warnings:

  - Added the required column `imageURL` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageURL" TEXT NOT NULL,
ADD COLUMN     "username" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Notifications" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "wikiURL" TEXT NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressGoal" (
    "id" SERIAL NOT NULL,
    "updatedDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "reportId" INTEGER,

    CONSTRAINT "ProgressGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckGoal" (
    "id" SERIAL NOT NULL,
    "updatedDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "reportId" INTEGER,

    CONSTRAINT "CheckGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "Icon" TEXT NOT NULL,
    "colorId" INTEGER NOT NULL,
    "progressGoalId" INTEGER,
    "checkGoalId" INTEGER,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hexCode" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressGoal" ADD CONSTRAINT "ProgressGoal_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckGoal" ADD CONSTRAINT "CheckGoal_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_progressGoalId_fkey" FOREIGN KEY ("progressGoalId") REFERENCES "ProgressGoal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_checkGoalId_fkey" FOREIGN KEY ("checkGoalId") REFERENCES "CheckGoal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
