/*
  Warnings:

  - You are about to drop the `CheckGoal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `progress` to the `ProgressGoal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CheckGoal" DROP CONSTRAINT "CheckGoal_reportId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_checkGoalId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_colorId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_progressGoalId_fkey";

-- AlterTable
ALTER TABLE "ProgressGoal" ADD COLUMN     "progress" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CheckGoal";

-- DropTable
DROP TABLE "Color";

-- DropTable
DROP TABLE "Tag";
