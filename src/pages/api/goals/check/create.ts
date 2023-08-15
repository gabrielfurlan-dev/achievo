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

export async function Create({ goals }: ICreateCheckGoalCommand) {
    try {
        await db.checkGoal.createMany({
            data: goals.map(goal => ({
                title: goal.title,
                index: goal.index,
                checked: goal.checked,
                reportId: goal.reportId,
            })),
        });

        return {
            data: "Relatório adicionado com sucesso!",
            error: "",
            type: "success",
        };
    } catch (error) {
        return {
            data: "Erro ao adicionar o relatório:",
            error: String(error),
            type: "error",
        };
    }
}
