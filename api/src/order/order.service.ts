import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
    constructor(private readonly prismaService: PrismaService) { }

    async buy(productId, quantity, user) {
        const product = await this.prismaService.product.findUnique({
            where: {
                id: productId,
            },
        });

        if (!product) {
            throw new NotFoundException("Product not found");
        }


        const existingOrder = await this.prismaService.order.findFirst({
            where: {
                userId: user.id,
                productId,
                delete: false,
            },
        });

        if (existingOrder) {
            // Nếu người dùng đã mua sản phẩm này, tăng số lượng lên 1
            await this.prismaService.order.update({
                where: { id: existingOrder.id },
                data: {
                    quantity: existingOrder.quantity + 1,
                },
            });
        } else {
            // Nếu chưa mua sản phẩm này, tạo đơn hàng mới
            await this.prismaService.order.create({
                data: {
                    userId: user.id,
                    productId,
                    quantity,
                    delete: false,
                },
            });
        }

        // Sau khi thực hiện, trả về danh sách đơn hàng của người dùng
        const userOrders = await this.prismaService.order.findMany({
            where: {
                userId: user.id,
            },
        });

        return userOrders;
    }

    async quantity(user) {
        // const orderCount = await this.prismaService.order.count(
        //     {
        //         where: {
        //             userId: user.id
        //         }
        //     }
        // );

        const orderCount = await this.prismaService.$queryRaw`select count(*) from "orders" where "userId" = ${user.id}`
        return orderCount[0].count;
    }

    // async myCart(user) {
    //     const myCart = await this.prismaService.$queryRaw`
    //         SELECT "a".*, "price"
    //         FROM "orders" "a"
    //         INNER JOIN 'products' "b" on "a"."productId" = "b"."id" 
    //         WHERE "userId" = ${user.id}
    //     `;

    //     return myCart;
    // }
    async myCart(user) {
        const myCart = await this.prismaService.$queryRaw`
            SELECT "a"."id" as "orderId","quantity", "b".*
            FROM "orders" "a"
            INNER JOIN "products" "b" ON "a"."productId" = "b"."id" 
            WHERE "a"."userId" = ${user.id}
        `;

        return myCart;
    }

    async updateCart(user, cartID: number, quantity) {
        if (!await this.prismaService.order.findUnique({ where: { id: cartID } })) { throw new NotFoundException("Orders not found") }
        const res = await this.prismaService.order.update({
            where: {
                id: cartID
            },
            data: {
                quantity
            }
        })

        return res
    }
    async deleteCart(user, cartID: number) {
        const myCart: [] = await this.prismaService.$queryRaw`
        SELECT "a".*, "b".*
        FROM "orders" "a"
        INNER JOIN "users" "b" ON "a"."userId" = "b"."id" 
        WHERE "a"."id" = ${cartID}
    `;
        if (myCart.length === 0) {
            throw new NotFoundException("order is not found")
        }
        const res = await this.prismaService.order.delete({
            where: {
                id: cartID
            },
        })
        return res
    }

    async total(user) {
        const orders: { quantity: number, price: number }[] = await this.prismaService.$queryRaw`
            SELECT "a"."quantity", "b"."price"
            FROM "orders" "a"
            INNER JOIN "products" "b" ON "a"."productId" = "b"."id"
            WHERE "a"."userId" = ${user.id}
        `;
        const totalAmount = orders.reduce((total, order) => {
            const orderTotal = order.quantity * order.price;
            return total + orderTotal;
        }, 0);
        return totalAmount
    }

    rate() {
        return "rate"
    }
}
