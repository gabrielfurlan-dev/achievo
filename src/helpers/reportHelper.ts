import { ICheckGoal } from "@/interfaces/goals/checkGoals/ICheckGoal";
import { IProgressGoal } from "@/interfaces/goals/progressGoals/IProgressGoal";

export function getCheckGoalsModified(
    originalGoals: ICheckGoal[],
    newGoals: ICheckGoal[]
) {
    console.log(originalGoals);
    console.log(newGoals);

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
