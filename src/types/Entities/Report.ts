import z from 'zod'
import { TaskDTOSchema } from '@/types/Entities/Task';

export const ReportSchema = z.object({
    id: z.number().optional(),
    createdDate: z.string(),
    updatedDate: z.string().optional(),
    enable: z.boolean().optional(),
    user: z.object({
        id: z.string().uuid(),
        name: z.string(),
        username: z.string().nullable(),
        email: z.string().optional(),
        imageURL: z.string(),
    }),
    tasks: z.array(TaskDTOSchema).optional()
})

export type Report = z.infer<typeof ReportSchema>;
