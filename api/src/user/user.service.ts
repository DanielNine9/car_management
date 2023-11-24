import { IsNotEmpty } from 'class-validator';
import { Seller } from './../common/decorator/role.decorator';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponse, UserResponseGlobal } from './dto/user.dto';
import { typeUser } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(): Promise<UserResponse[]> {
    return (await this.prismaService.user.findMany()).map(
      (user) => new UserResponse(user),
    );
  }

  async getUser(param: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: param,
      },
    });
    if (!user) throw new NotFoundException('user not found');
    return new UserResponse(user);
  }

  async updateUser(param: number, data, user): Promise<UserResponse> {
    const userUpdate = await this.prismaService.user.findUnique({
      where: {
        id: param,
      },
    });
    if (user.id !== userUpdate.id && user.role !== typeUser.ADMIN) {
      throw new ForbiddenException('You are not the right');
    }

    if (user.id !== userUpdate.id) {
      delete data.username;
      delete data.address;
      delete data.image;
    }

    return new UserResponse(
      await this.prismaService.user.update({
        where: {
          id: param,
        },
        data,
      }),
    );
  }

  async deleteUser(param: number): Promise<string> {
    await this.prismaService.user.update({
      where: {
        id: param,
      },
      data: {
        banned: true,
      },
    });
    return 'successfully';
  }

  async getUserGlobal(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException('user not found');
    return new UserResponseGlobal(user);
  }

  async revenueById(id: number): Promise<number> {
    const revenue: number = await this.prismaService.$queryRaw`
    SELECT SUM("price")
    FROM "Products" INNER JOIN "Users" ON "Products"."sellerId" = "Users"."id"
    INNER JOIN "Orders" ON "Orders"."productId" = "Products"."id" AND "Products"."delete" = "false"
    WHERE "Users"."id" = ${id}
    `;
    return revenue;
  }

  async getSellers(): Promise<any> {
    const emps = await this.prismaService.$queryRaw`
 SELECT *
FROM "users" 
WHERE "role" = 'SELLER'
    `;

    return emps;
  }

  async getCustomer(sellerId): Promise<any> {
    const emps: any[] = await this.prismaService.$queryRaw`
      SELECT SUM("orders"."quantity") as "quantity", "users"."username", "users"."id", "products"."name", "products"."imageURL", "orders"."success", "products"."id" as "productId"
      FROM "orders" 
      INNER JOIN "users" ON "orders"."userId" = "users"."id"
      INNER JOIN "products" ON "products"."id" = "orders"."productId"
      WHERE "products"."sellerId" = ${sellerId}
      GROUP BY "orders"."quantity", "users"."username", "users"."id", "products"."name", "products"."imageURL", "orders"."success","products"."id"
      
    `;
    if (emps.length != 0) {
      return emps?.map((emp) => ({
        quantity: emp.quantity.toString(),
        username: emp.username,
        id: emp.id,
        name: emp.name,
        imageURL: emp.imageURL,
        success: emp.success,
        productId: emp.productId,
      }));
    }

    return emps;
  }

  async getCustomerAdmin(): Promise<any> {
    const emps: any[] = await this.prismaService.$queryRaw`
      SELECT SUM("orders"."quantity") as "quantity", "users"."username", "users"."id", "products"."name", "products"."imageURL", "orders"."success", "products"."id" as "productId"
      FROM "orders" 
      INNER JOIN "users" ON "orders"."userId" = "users"."id"
      INNER JOIN "products" ON "products"."id" = "orders"."productId"
      GROUP BY "orders"."quantity", "users"."username", "users"."id", "products"."name", "products"."imageURL", "orders"."success","products"."id"
      
    `;
    if (emps.length != 0) {
      return emps?.map((emp) => ({
        quantity: emp.quantity.toString(),
        username: emp.username,
        id: emp.id,
        name: emp.name,
        imageURL: emp.imageURL,
        success: emp.success,
        orderId: emp.orderId,
        productId: emp.productId,
      }));
    }

    return emps;
  }

  // async getCustomer(sellerId): Promise<any> {
  //   const emps = await this.prismaService.$queryRaw`
  //     SELECT DISTINCT *
  //     FROM "orders"
  //     INNER JOIN "users" ON "orders"."userId" = "users"."id"
  //     INNER JOIN "products" ON "products"."id" = "orders"."productId"
  //     WHERE "products"."sellerId" = ${sellerId}

  //   `;
  //   return emps
  // }
}
