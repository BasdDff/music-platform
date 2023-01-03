interface IRole {
    name: string
    description: string
}

export interface IUser {
    _id: string
    email: string
    roles: IRole[]
    ban: boolean
    username: string
    img: string
}