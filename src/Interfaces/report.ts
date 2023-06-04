export interface IReport {
    id: number;
    date: string;
    username: string;
    email: string;
    reportContent: IReportContent;
}

export interface IReportContent {
    id: number;
    progressGoals: IProgressGoal[];
    checkGoals: ICheckGoal[];
    hits: IHit[];
    misses: IMiss[];
    learnings: ILearned[];
}

export interface IProgressGoal {
    id: number;
    title: string;
    total: number;
    value: number;
}

export interface ICheckGoal {
    id: number;
    title: string;
    checked: boolean;
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

