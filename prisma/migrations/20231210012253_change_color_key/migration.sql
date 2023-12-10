/*
  Warnings:

  - The primary key for the `Color` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `colorId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `CheckGoal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `colorHexCode` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CheckGoal" DROP CONSTRAINT "CheckGoal_reportId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_colorId_fkey";

-- AlterTable
ALTER TABLE "Color" DROP CONSTRAINT "Color_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Color_pkey" PRIMARY KEY ("hexCode");

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "colorId",
ADD COLUMN     "colorHexCode" TEXT NOT NULL;

-- DropTable
DROP TABLE "CheckGoal";

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_colorHexCode_fkey" FOREIGN KEY ("colorHexCode") REFERENCES "Color"("hexCode") ON DELETE RESTRICT ON UPDATE CASCADE;
