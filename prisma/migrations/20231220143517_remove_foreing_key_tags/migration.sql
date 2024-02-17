/*
  Warnings:

  - Made the column `userId` on table `Tag` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "userId" SET NOT NULL;
