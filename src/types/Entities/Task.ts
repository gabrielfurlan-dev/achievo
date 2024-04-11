import { z } from 'zod';

export const TaskDTOSchema = z.object({
    id: z.number().optional(),
    reportId: z.number().optional(),
    title: z.string(),
    value: z.number(),
    total: z.number(),
    updatedDate: z.string().optional(),
    createdDate: z.string().optional(),
    progress: z.number().optional(),
});

export type TaskDTO = z.infer<typeof TaskDTOSchema>;
