import { ICheckGoal } from '@/interfaces/goals/checkGoals/ICheckGoal';
import { IProgressGoal } from '@/interfaces/goals/progressGoals/IProgressGoal';
import { IUser } from '@/interfaces/aiUser';

export interface IReport {
    id: string;
    createdDate: string;
    username: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    user: IUser;
}
