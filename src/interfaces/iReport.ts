import { ICheckGoal } from '@/interfaces/goals/checkGoals/iCheckGoal';
import { IProgressGoal } from '@/interfaces/goals/progressGoals/iProgressGoal';
import { IUser } from '@/interfaces/users/IUser';

export interface IReport {
    id: string;
    createdDate: string;
    username: string;
    updatedDate: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    user: IUser;
}
