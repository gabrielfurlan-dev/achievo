-- DropForeignKey
ALTER TABLE "CheckGoal" DROP CONSTRAINT "CheckGoal_reportId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressGoal" DROP CONSTRAINT "ProgressGoal_reportId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressGoal" ADD CONSTRAINT "ProgressGoal_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckGoal" ADD CONSTRAINT "CheckGoal_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
