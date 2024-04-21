import z from "zod";

export const progressGoalRawSchema = z.object({
    title: z.string()/*.nonempty()*/,
    total: z.number(),
    value: z.number(),
    index: z.number()
});

export type progressGoalRaw = z.infer<typeof progressGoalRawSchema>;
