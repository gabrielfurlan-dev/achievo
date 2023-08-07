import { IProgressGoal } from "@/Interfaces/Goals/progressGoals/IProgressGoal";
import { ICheckGoal } from "@/Interfaces/Goals/checkGoals/ICheckGoal";
import { IUser } from "@/Interfaces/IUser";

export interface IReport {
    id: string;
    createdDate: string;
    username: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    user: IUser;
}
