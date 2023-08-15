import { IProgressGoalRaw } from "./IProgressGoalRaw";

export default interface IProgressGoal extends IProgressGoalRaw {
    reportId: number;
    id: number;
}
