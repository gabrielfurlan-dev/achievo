import { IProgressGoal } from '@/Interfaces/goals/progressGoals/IProgressGoal';
import { IUser } from '@/Interfaces/IUser';
import ICheckGoal from './goals/checkGoals/ICheckGoal';

export interface IReport {
    id: string;
    createdDate: string;
    username: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    user: IUser;
}
