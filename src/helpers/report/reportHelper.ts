import { ICheckGoal } from "@/interfaces/goals/checkGoals/iCheckGoal";
import { IProgressGoal } from "@/interfaces/goals/progressGoals/iProgressGoal";

export function getCheckGoalsModified(
    originalGoals: ICheckGoal[],
    newGoals: ICheckGoal[]
) {
    const inserted: ICheckGoal[] = newGoals.filter(goal => goal.id < 0);
    const deleted: ICheckGoal[] = [];
    const modified: ICheckGoal[] = [];

    for (const originalGoal of originalGoals) {
        const goalFinded = newGoals.find(
            newGoal => newGoal.id === originalGoal.id
        );

        if (!goalFinded) {
            deleted.push(originalGoal);
        } else if (
            JSON.stringify(goalFinded) !== JSON.stringify(originalGoal)
        ) {
            modified.push(goalFinded);
        }
    }

    return { deleted, inserted, modified };
}

export function getProgressGoalsModified(
    originalGoals: IProgressGoal[],
    newGoals: IProgressGoal[]
) {
    const inserted: IProgressGoal[] = newGoals.filter(goal => goal.id < 0);
    const deleted: IProgressGoal[] = [];
    const modified: IProgressGoal[] = [];

    for (const originalGoal of originalGoals) {
        const goalFinded = newGoals.find(
            newGoal => newGoal.id === originalGoal.id
        );

        if (!goalFinded) {
            deleted.push(originalGoal);
        } else if (
            JSON.stringify(goalFinded) !== JSON.stringify(originalGoal)
        ) {
            modified.push(goalFinded);
        }
    }

    return { deleted, inserted, modified };
}
