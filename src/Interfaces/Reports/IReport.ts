import { ICheckGoal } from "../goals/checkGoals/ICheckGoal";
import { IProgressGoal } from "../goals/progressGoals/IProgressGoal";
import { IUser } from "../IUser";

export interface IReport {
    id: string;
    createdDate: string;
    username: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    user: IUser;
}
