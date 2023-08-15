import { ICheckGoal } from "../Goals/checkGoals/ICheckGoal";
import { IProgressGoal } from "../Goals/progressGoals/IProgressGoal";
import { IUser } from "../IUser";

export interface IReport {
    id: string;
    createdDate: string;
    username: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    user: IUser;
}
