-- AlterTable
ALTER TABLE "User" ADD COLUMN     "alreadyRegistered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "enable" BOOLEAN NOT NULL DEFAULT true;
