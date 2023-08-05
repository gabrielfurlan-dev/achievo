import { ICheckGoal } from "../Goals/CheckGoals/ICheckGoal";
import { IProgressGoal } from "../Goals/ProgressGoals/IProgressGoal";

export interface IReport {
    id: string;
    date: string;
    username: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    userPhotoURL?: string;
}
