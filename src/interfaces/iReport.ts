import { IProgressGoal } from '@/interfaces/goals/progressGoals/iProgressGoal';
import { IUser } from '@/interfaces/users/IUser';

export interface IReport {
    reportId: string;
    createdDate: string;
    username: string;
    updatedDate: string;
    progressGoals: IProgressGoal[];
    user: IUser;
}
