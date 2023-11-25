import { ITag } from "@/interfaces/tags/ITag";
import { IProgressGoalRaw } from "./iProgressGoalRaw";

export interface IProgressGoal extends IProgressGoalRaw {
    reportId: number;
    updatedDate: string;
    id: number;
    tags?: ITag[]
}
