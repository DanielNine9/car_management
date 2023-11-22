import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Admin, Public, Seller, User } from 'src/common/decorator/';
import { ProductDTO, UpdateProductDTO } from './dto';
import { RoleGuard } from 'src/common/guard/role';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get("myReveune")
    @Public()
    myReveune(@User() user) {
        console.log(user)
        return this.productService.myRevenue(user)
    }
    @Get("bestSelling")
    @Public()
    bestSellingProducts() {
        return this.productService.bestSellingProducts()
    }
    @Get("bestDiscount")
    @Public()
    bestDiscountProducts() {
        return this.productService.bestDiscountProducts()
    }

    @Post()
    @Seller()
    @UseGuards(RoleGuard)
    createProduct(@Body() productDTO: ProductDTO, @User() user) {
        return this.productService.createProduct(productDTO, user)
    }

    @Get("/myProduct")
    @Seller()
    @UseGuards(RoleGuard)
    myProduct(@User() user) {
        console.log(user)
        return this.productService.myProduct(user)
    }
    @Get("/myProductDelete")
    @Seller()
    @UseGuards(RoleGuard)
    myProductDelete(@User() user) {
        return this.productService.myProductDelete(user)
    }


    @Get("/restore")
    @Seller()
    @UseGuards(RoleGuard)
    restoreAllMyProduct(@User() user) {
        return this.productService.restoreAllMyProduct(user)
    }

    @Get("/restore/:productId")
    @Seller()
    @UseGuards(RoleGuard)
    restore(@Param("productId", ParseIntPipe) productId, @User() user) {
        return this.productService.restoreProduct(productId, user)
    }

    @Get()
    @Public()
    getProducts() {
        return this.productService.getProducts()
    }

    @Public()
    @Get("/:productId")
    getProduct(@Param("productId", ParseIntPipe) productId) {
        return this.productService.getProduct(productId)
    }

    @Put("/:productId")
    @Seller()
    @UseGuards(RoleGuard)
    updateProduct(@Param("productId", ParseIntPipe) productId, @Body() body: UpdateProductDTO, @User() user) {
        return this.productService.updateProduct(productId, body, user)
    }

    @Seller()
    @Delete("/:productId")
    @UseGuards(RoleGuard)
    deleteProduct(@Param("productId", ParseIntPipe) productId, @User() user) {
        return this.productService.deleteProduct(productId, user)
    }

    // @Get("/best")
    // @Public()
    // bestSellingProducts() {
    //     return this.productService.bestSellingProducts()
    // }


}
