import { SetMetadata } from "@nestjs/common";
import { typeUser } from "@prisma/client";

export const Admin = () => SetMetadata(
    'role', [typeUser.ADMIN]
)

export const AllUser = () => SetMetadata(
    'role', [typeUser.ADMIN, typeUser.SELLER, typeUser.BUYER]
)

export const Seller = () => SetMetadata(
    'role', [typeUser.SELLER, typeUser.ADMIN]
)