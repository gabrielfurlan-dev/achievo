import { IProgressGoal as ITask } from '@/interfaces/goals/progressGoals/iProgressGoal';
import { IUser } from '@/interfaces/users/IUser';

export interface IReport {
    id: string;
    createdDate: string;
    username: string;
    updatedDate: string;
    tasks: ITask[];
    user: IUser;
}
