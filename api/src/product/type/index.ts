import { typeProduct } from "@prisma/client"
export class Product {
    name: string
    price: number
    local?: string
    desc?: string
    discount: number
    source: string
    type: typeProduct
    image: string
}

