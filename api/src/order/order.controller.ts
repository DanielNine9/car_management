import {
  Controller,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { User } from '../common/decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get('total')
  total(@User() user) {
    console.log(user)
    return this.orderService.total(user);
  }
  @Get('/cart')
  cart(@User() user) {
    return this.orderService.myCart(user);
  }
  @Get('/success/:userId/:productId')
  success(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @User() user,
  ) {
    return this.orderService.updateSuccess(user.id, userId, productId);
  }

  @Get('/delete/:userId/:productId')
  deleteCartBySeller(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @User() user,
  ) {
    return this.orderService.deleteCartBySeller(user.id, userId, productId);
  }

  @Post('/buy/:productId')
  buy(
    @Body('quantity', ParseIntPipe) quantity: number,
    @Param('productId', ParseIntPipe) productId: number,
    @User() user,
  ) {
    return this.orderService.buy(productId, quantity, user);
  }

  @Put('/:cartId')
  updateCart(
    @Body('quantity', ParseIntPipe) quantity: number,
    @Param('cartId', ParseIntPipe) cartId: number,
    @User() user,
  ) {
    return this.orderService.updateCart(user, cartId, quantity);
  }


  @Get('quantity')
  quantity(@User() user) {
    return this.orderService.quantity(user);
  }

  

  @Delete('/:cartId')
  delete(@User() user, @Param('cartId') id: number) {
    return this.orderService.deleteCart(user, id);
  }

  @Get()
  myCart(@User() user) {
    return this.orderService.myCart(user);
  }

  @Post('/rate')
  rate() {
    return this.orderService.rate();
  }
}
