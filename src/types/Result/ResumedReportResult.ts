import { z } from "zod";

export const ResumedReportResultSchema = z.object({
    reportId: z.number(),
    createdDate: z.string(),
    updatedDate: z.string(),
    progress: z.number(),
    userId: z.string(),
    userName: z.string(),
    userUsername: z.string(),
    userImageURL: z.string()
});

export type ResumedReportResult = z.infer<typeof ResumedReportResultSchema>
