import { ICheckGoal } from '@/interfaces/goals/checkGoals/iCheckGoal';
import { IProgressGoal } from '@/interfaces/goals/progressGoals/iProgressGoal';
import { IUser } from '@/interfaces/iUser';

export interface IReport {
    id: string;
    createdDate: string;
    username: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    user: IUser;
}
