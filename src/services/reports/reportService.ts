import { z } from 'zod';
import { sb } from '@/spellBinder';
import { Report, ReportSchema } from '@/types/Entities/Report';
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
    console.log(reportId)
    return await sb.get({
        url: '/reports/' + reportId,
        schema: ReportSchema,
    });
}

export async function getLastReportId(userId: string) {
    return await sb.get({
        url: '/reports/current-week',
        params: { userId },
        schema: z.number(),
    });
}
