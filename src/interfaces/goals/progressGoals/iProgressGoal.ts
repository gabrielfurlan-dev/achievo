import { IProgressGoalRaw } from "./iProgressGoalRaw";

export interface IProgressGoal extends IProgressGoalRaw {
    reportId: number;
    id: number;
}
