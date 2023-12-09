/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_checkGoalId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_colorId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_progressGoalId_fkey";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "GoalTags" (
    "progressGoalId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PersonalTag" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "colorId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PersonalTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GoalTags_progressGoalId_tagId_key" ON "GoalTags"("progressGoalId", "tagId");

-- AddForeignKey
ALTER TABLE "GoalTags" ADD CONSTRAINT "GoalTags_progressGoalId_fkey" FOREIGN KEY ("progressGoalId") REFERENCES "ProgressGoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalTags" ADD CONSTRAINT "GoalTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "PersonalTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalTag" ADD CONSTRAINT "PersonalTag_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalTag" ADD CONSTRAINT "PersonalTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
