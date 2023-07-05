export interface IReport {
    id: string;
    date: string;
    username: string;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    userPhotoURL?: string;
}

export interface IProgressGoal {
    id: number;
    title: string;
    total: number;
    value: number;
    indice: number
}

export interface ICheckGoal {
    id: number;
    title: string;
    checked: boolean;
    indice: number;
}

export interface IHit {
    id: number;
    text: string;
}

export interface IMiss {
    id: number;
    text: string;
}

export interface ILearned {
    id: number;
    text: string;
}

