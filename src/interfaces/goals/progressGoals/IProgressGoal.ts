import { IProgressGoalRaw } from "./IProgressGoalRaw";

export interface IProgressGoal extends IProgressGoalRaw {
    reportId: number;
    id: number;
}
