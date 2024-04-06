import z from 'zod'
import { TaskSchema } from '@/types/Entities/Task';

export const ReportSchema = z.object({
    id: z.number().optional(),
    createdDate: z.date(),
    updatedDate: z.date().optional(),
    enable: z.boolean().optional(),
    tasks: z.array(TaskSchema),
    user: z.object({
        id: z.string().uuid(),
        name: z.string(),
        username: z.string(),
        email: z.string(),
        imageUrl: z.string(),
    })
})

export type Report = z.infer<typeof ReportSchema>;
