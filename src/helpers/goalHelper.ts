import { IProgressGoal } from './../interfaces/goals/progressGoals/iProgressGoal';

export function normalizeProgressGoals(goals: IProgressGoal[]) {

    return goals.map((goal) => ({
        ...goal,
        value: Number(goal.value),
        total: Number(goal.total),
    }))
}
