import { z } from 'zod';
import { sb } from '@/spellBinder';
import { ReportSchema } from '@/types/Entities/Report';
import { UpdateReportCommand } from '@/types/Commands/Report/UpdateReportCommand';
import { CreateNewReportCommand, CreateNewReportCommandSchema } from '@/types/Commands/Report/CreateNewReportCommand';

export async function createReport(command: CreateNewReportCommand) {
    console.log(command)
    return await sb.post({
        url: "/reports",
        schema: ReportSchema,
        body: command
    });
}

export async function updateReport(command: UpdateReportCommand) {
    return await sb.put({
        url: "/reports",
        schema: CreateNewReportCommandSchema,
        body: command
    });
}

export async function getReport(reportId: number) {
    const queryParams = new URLSearchParams({ reportId: reportId.toString() });
    return await sb.get({
        url: `/reports?${queryParams.toString()}`,
        schema: ReportSchema,
    });
}

export async function existsReportInCurrentWeek(userId: string) {
    const queryParams = new URLSearchParams({ userId });
    return await sb.get({
        url: `/reports/exists/current-week?${queryParams.toString()}`,
        schema: z.boolean(),
    });
}

export async function getLastReportId(userId: string) {
    const queryParams = new URLSearchParams({ userId: userId });
    return await sb.get({
        url: `/report/current-week?${queryParams.toString()}`,
        schema: z.number(),
    });
}
