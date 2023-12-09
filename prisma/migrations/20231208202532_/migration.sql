/*
  Warnings:

  - You are about to drop the `PersonalTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GoalTags" DROP CONSTRAINT "GoalTags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalTag" DROP CONSTRAINT "PersonalTag_colorId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalTag" DROP CONSTRAINT "PersonalTag_userId_fkey";

-- DropTable
DROP TABLE "PersonalTag";

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "colorId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GoalTags" ADD CONSTRAINT "GoalTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
