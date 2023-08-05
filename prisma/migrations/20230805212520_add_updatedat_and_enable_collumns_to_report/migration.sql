/*
  Warnings:

  - Added the required column `updatedDate` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "enable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdDate" SET DEFAULT CURRENT_TIMESTAMP;
