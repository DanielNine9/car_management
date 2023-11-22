import { Controller, Post, Param, Body, ParseIntPipe, Get, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { User } from '../common/decorator';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post("/buy/:productId")
    buy(@Body("quantity", ParseIntPipe) quantity: number,
        @Param("productId", ParseIntPipe) productId: number,
        @User() user
    ) {
        return this.orderService.buy(productId, quantity, user)
    }

    @Put("/:cartId")
    updateCart(
        @Body("quantity", ParseIntPipe) quantity: number,
        @Param("cartId", ParseIntPipe) cartId: number,
        @User() user
    ) {
        return this.orderService.updateCart(user, cartId, quantity)
    }

    @Get('/cart')
    cart(@User() user) {
        return this.orderService.myCart(user)
    }

    @Get("quantity")
    quantity(@User() user) {
        return this.orderService.quantity(user)
    }

    @Get("total")
    total(@User() user) {
        return this.orderService.total(user)
    }

    @Delete("/:cartId")
    delete(@User() user, @Param("cartId") id: number) {
        return this.orderService.deleteCart(user, id)
    }

    @Get()
    myCart(@User() user) {
        return this.orderService.myCart(user)
    }

    @Post("/rate")
    rate() {
        return this.orderService.rate()
    }

}
