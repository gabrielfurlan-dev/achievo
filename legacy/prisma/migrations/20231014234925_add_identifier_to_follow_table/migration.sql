-- AlterTable
ALTER TABLE "Follow" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Follow_pkey" PRIMARY KEY ("id");
