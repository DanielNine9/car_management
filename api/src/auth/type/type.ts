import { typeUser } from "@prisma/client"
export class Register {
    username: string
    email: string
    address: string
    password: string
    imageURL?: string
}

export class Login{
    email: string
    password: string
}

export interface JWTPayload{
    sub: number
    role: typeUser
    address: string
}