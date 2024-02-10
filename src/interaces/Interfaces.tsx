
export interface IBonus {
    text: string,
    color: string
}

export interface ITask {
    id: number,
    name: string,
    isCheck: boolean,
    date: Date,
    statut: string
    bonus?: IBonus
}