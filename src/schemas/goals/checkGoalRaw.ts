import z from "zod";

const checkGoalRawSchema = z.object({
    title: z.string(),
    checked: z.boolean(),
    index: z.number(),
})

export type checkGoal = z.infer<typeof checkGoalRawSchema>;
