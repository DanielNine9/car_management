import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, isNumber } from "class-validator"
import { typeProduct } from "@prisma/client"
import { Exclude } from "class-transformer"


export class ProductDTO {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsPositive()
    price: number

    @IsString()
    @IsOptional()
    local?: string

    @IsString()
    @IsNotEmpty()
    source: string

    @IsEnum(typeProduct)
    @IsNotEmpty()
    type: typeProduct

    @IsString()
    @IsNotEmpty()
    desc: string

    @IsNumber()
    @IsPositive()
    discount: number

    @IsString()
    @IsNotEmpty()
    image: string
}

export class ResponseProduct {
    id: number
    name: string
    price: number
    local: string
    source: string
    type: typeProduct
    desc: string
    discount: number
    sellerId: number
    created_at: Date
    orderCount?: number
    @Exclude()
    updated_at: Date
    constructor(partial: Partial<ResponseProduct>) {
        Object.assign(this, partial)
    }
}

export class UpdateProductDTO {
    @IsString()
    @IsOptional()
    name: string

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price: number

    @IsString()
    @IsOptional()
    local?: string

    @IsString()
    @IsOptional()
    source: string

    @IsString()
    @IsOptional()
    desc: string

    @IsNumber()
    @IsOptional()
    @IsPositive()
    discount: number

    @IsEnum(typeProduct)
    @IsOptional()
    type: typeProduct

    @IsString()
    @IsOptional()
    imageURL?: string[]
}