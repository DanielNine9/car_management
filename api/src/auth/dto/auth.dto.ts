import { typeUser } from "@prisma/client"
import { IsString, IsOptional, IsEmail, IsNotEmpty, IsEnum, IsNumber, IsPositive } from "class-validator"
export class RegisterDTO {
    @IsString()
    @IsOptional()
    username: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsOptional()
    imageURL?: string
}

export class ResponseUser {
    @IsString()
    @IsOptional()
    username: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    address: string
}

export class LoginDTO{
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}