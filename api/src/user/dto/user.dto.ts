import { typeUser } from "@prisma/client"
import { Exclude } from "class-transformer"
import { IsEnum, IsOptional, IsString } from "class-validator"

export class UserResponse {
    id: number

    username: string
    email: string
    address: string

    @Exclude()
    password: string

    role: typeUser

    @Exclude()
    refreshToken: string

    created_at: Date

    updated_at: Date
    constructor(partial: Partial<UserResponse>) {
        Object.assign(this, partial)
    }
}


export class UserResponseGlobal {
    @Exclude()
    id: number

    username: string
    email: string
    address: string

    @Exclude()
    password: string

    role: typeUser

    @Exclude()
    refreshToken: string

    created_at: Date

    @Exclude()
    updated_at: Date

    @Exclude()
    banned: boolean

    imageURL: string

    constructor(partial: Partial<UserResponse>) {
        Object.assign(this, partial)
    }
}


export class UserUpdateDTO {
    @IsString()
    @IsOptional()
    username?: string

    @IsString()
    @IsOptional()
    address?: string

    @IsOptional()
    @IsOptional()
    banned?: boolean

    @IsEnum(typeUser)
    @IsOptional()
    role?: typeUser

    @IsString()
    @IsOptional()
    imageURL?: string
}