import { db } from "@/db";

export interface ICreateCheckGoalCommand {
    goals: [
        {
            reportId: number;
            title: string;
            checked: boolean;
            index: number;
        }
    ];
}

export default async function handler({ goals }: ICreateCheckGoalCommand) {
    try {

        for (const goal of goals) {
            await db.task.create({
                data: {
                    title: goal.title,
                    index: goal.index,
                    value: goal.checked ? 1 : 0,
                    total: 1,
                    reportId: goal.reportId,
                },
            });
        }

        return {
            data: "Meta adicionada com sucesso!",
            error: "",
            type: "success",
        };
    } catch (error) {
        return {
            data: "Erro ao adicionar a Meta:",
            error: String(error),
            type: "error",
        };
    }
}
