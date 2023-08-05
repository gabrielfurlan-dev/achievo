export interface IReport {
    id: string;
    date: string;
    username: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    userPhotoURL?: string;
}

export interface IProgressGoal extends IProgressGoalRaw {
    reportId: number,
    id: number
}

export interface IProgressGoalRaw {
    title: string,
    total: number,
    value: number,
    index: number
}

export interface ICheckGoal extends ICheckGoalRaw {
    reportId: number,
    id: number
}

export interface ICheckGoalRaw {
    title: string,
    checked: boolean,
    index: number
}
