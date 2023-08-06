import { IProgressGoal } from "@/Interfaces/Goals/ProgressGoals/IProgressGoal";
import { ICheckGoal } from "@/Interfaces/Goals/CheckGoals/ICheckGoal";
import { IUser } from "@/Interfaces/IUser";

export interface IReport {
    id: string;
    createdDate: string;
    username: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    user: IUser;
}
