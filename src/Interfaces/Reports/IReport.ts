import { ICheckGoal } from '@/Interfaces/goals/checkGoals/ICheckGoal';
import { IProgressGoal } from '@/Interfaces/goals/progressGoals/IProgressGoal';
import { IUser } from '@/Interfaces/IUser';

export interface IReport {
    id: string;
    createdDate: string;
    username: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    user: IUser;
}
