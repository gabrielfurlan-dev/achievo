import { z } from 'zod';

export const TaskSchema = z.object({
    id: z.number().int(),
    reportId: z.number(),
    createdDate: z.date().optional(),
    updatedDate: z.date().optional(),
    title: z.string(),
    value: z.number(),
    total: z.number(),
    progress: z.number(),
});

export type Task = z.infer<typeof TaskSchema>;
