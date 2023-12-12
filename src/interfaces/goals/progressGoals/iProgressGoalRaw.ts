import { ITag } from "@/interfaces/tags/ITag";

export interface IProgressGoalRaw {
    title: string,
    total: number,
    value: number,
    index: number,
    tags: ITag[]
}
