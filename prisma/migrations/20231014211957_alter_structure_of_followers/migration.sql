/*
  Warnings:

  - The primary key for the `Follow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followerUserId` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Follow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,followingUserId]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followerUserId_fkey";

-- DropIndex
DROP INDEX "Follow_userId_followerUserId_key";

-- AlterTable
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_pkey",
DROP COLUMN "followerUserId",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Follow_userId_followingUserId_key" ON "Follow"("userId", "followingUserId");
