import { ICheckGoalRaw } from "./iCheckGoalRaw";

export interface ICheckGoal extends ICheckGoalRaw {
    reportId: number;
    updatedDate: string;
    id: number;
}
