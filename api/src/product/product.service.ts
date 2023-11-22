import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './type';
import { User } from 'src/common/decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseProduct } from './dto';
import { typeProduct, typeUser } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProducts() {
    const productsWithCount: ResponseProduct[] = await this.prismaService
      .$queryRaw`
          SELECT "p".*, COUNT("o"."id") as "orderCount"
          FROM "products" "p"
          LEFT JOIN "orders" "o" ON "p"."id" = "o"."productId"
          WHERE "p"."delete" = false
          GROUP BY "p"."id"
        `;

    const products = productsWithCount.length
      ? productsWithCount?.map((product) => {
          const responseProduct = new ResponseProduct(product);
          responseProduct.orderCount = Number(product.orderCount);
          return responseProduct;
        })
      : [];

    return products;
  }

  async getProduct(param: number) {
    // const productWithCount = await this.prismaService.$queryRaw`
    //       SELECT "p".*, COUNT("o"."id") as "orderCount"
    //       FROM "products" "p"
    //       LEFT JOIN "orders" "o" ON "p"."id" = "o"."productId"
    //       WHERE "p"."id" = ${param}
    //       AND "p"."delete" = false
    //       AND "o"."id" IS NOT NULL
    //       GROUP BY "p"."id"
    //     `;
    const productWithCount = await this.prismaService.$queryRaw`
    SELECT "p".*, SUM("o"."quantity") as "orderCount"
    FROM "products" "p"
    LEFT JOIN "orders" "o" ON "p"."id" = "o"."productId"
    WHERE "p"."id" = ${param}
    AND "p"."delete" = false
    GROUP BY "p"."id"
  `;
  console.log(productWithCount)

    if (!productWithCount[0]) throw new NotFoundException('Product not found');

    return new ResponseProduct({
      ...productWithCount[0],
      orderCount: Number(productWithCount[0].orderCount),
    });
  }

  async myRevenue(param: number) {
    const productsWithCount = await this.prismaService.$queryRaw`
    SELECT
      "p".*,
      COUNT("o"."id") as "orderCount"
    FROM
      "products" "p"
      INNER JOIN "users" "u" ON "u"."id" = "p"."sellerId"
      LEFT JOIN "orders" "o" ON "p"."id" = "o"."productId"
    WHERE
      "u"."id" = ${param}
      AND "o"."id" IS NOT NULL
      AND "p"."delete" = false
    GROUP BY
      "p"."id"
  `;

    if (!productsWithCount[0]) throw new NotFoundException('Product not found');

    return new ResponseProduct({
      ...productsWithCount[0],
      orderCount: Number(productsWithCount[0].orderCount),
    });
  }

  async createProduct(product: Product, user) {
    const local = product.local ? product.local : user.address;
    console.log(product.type == 'four');
    const newProduct = await this.prismaService.product.create({
      data: {
        name: product.name,
        price: product.price,
        local,
        source: product.source,
        type: product.type,
        sellerId: user.id,
        desc: product.desc,
        discount: product.discount,
        delete: false,
        imageURL: product.image,
      },
    });

    return new ResponseProduct(newProduct);
  }

  async deleteProduct(productId: number, user) {
    const find = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (find) {
      if (+user.id !== +find.sellerId && user.role !== typeUser.ADMIN) {
        throw new ForbiddenException("You aren't the right");
      }

      const res = await this.prismaService.product.update({
        where: {
          id: productId,
        },
        data: {
          ...find,
          delete: true,
        },
      });
      return {
        res,
        message: 'successfully',
      };
    }
    return {
      massage: 'not found',
    };
  }

  async myProduct(user) {
    const myProduct: [] = await this.prismaService.$queryRaw`
        SELECT "b".*
        FROM "users" "a"
        INNER JOIN "products" "b" ON "a"."id" = "b"."sellerId" 
        WHERE "a"."id" = ${user.id}
    `;

    return (
      myProduct
        ?.filter((product: any) => product.delete === false)
        ?.map((product: any) => new ResponseProduct(product)) || []
    );
  }

  async myProductDelete(user) {
    const myProduct: [] = await this.prismaService.$queryRaw`
        SELECT "b".*
        FROM "users" "a"
        INNER JOIN "products" "b" ON "a"."id" = "b"."sellerId" 
        WHERE "a"."id" = ${user.id}
        AND "b"."delete" = true
    `;

    return myProduct?.map((product: any) => new ResponseProduct(product)) || [];
  }

  async updateProduct(param: number, data, user) {
    const find = await this.prismaService.product.findUnique({
      where: {
        id: param,
      },
    });
    if (user.id !== find.sellerId) {
      throw new ForbiddenException('You are not the right');
    }
    if (user.role !== typeUser.ADMIN || user.id != find.sellerId) {
      delete data.delete;
    }
    if (find) {
      if (user.id != find.sellerId && user.role !== typeUser.ADMIN) {
        throw new ForbiddenException('You are not the right');
      }
      const update = await this.prismaService.product.update({
        where: {
          id: param,
        },
        data,
      });
      return new ResponseProduct(update);
    }
    throw new NotFoundException('product is not found');
  }

  async restoreProduct(productId: number, user) {
    const find = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (user.id !== find.sellerId && user.role !== typeUser.ADMIN) {
      throw new ForbiddenException('You are not the right');
    }

    if (!find) {
      throw new NotFoundException('product not found');
    }

    await this.prismaService.product.update({
      where: {
        id: productId,
      },
      data: {
        delete: false,
      },
    });
    return { message: 'successfully', status: 200 };
  }

  async restoreAllMyProduct(user) {
    const myProduct: ResponseProduct[] = await this.prismaService.$queryRaw`
        SELECT "b".*
        FROM "users" "a"
        INNER JOIN "products" "b" ON "a"."id" = "b"."sellerId" 
        WHERE "a"."id" = ${user.id}
        AND "b"."delete" = true
    `;
    if (myProduct.length === 0) {
      return { message: 'succesfully' };
    }
    if (user.id !== myProduct[0].sellerId && user.role !== typeUser.ADMIN) {
      throw new ForbiddenException('You are not the right');
    }

    await this.prismaService.product.updateMany({
      where: {
        id: {
          in: myProduct.map((product) => product.id),
        },
      },
      data: {
        delete: false,
      },
    });

    return { message: 'succesfully' };
  }

  async bestSellingProducts() {
    // const myProductData: ResponseProduct[] = await this.prismaService.$queryRaw`
    //       SELECT "b".*, COUNT(*) as "orderCount"
    //       FROM "orders" "a"
    //       RIGHT JOIN "products" "b" ON "a"."productId" = "b"."id"
    //       WHERE "b"."delete" = false AND "a"."id" IS NOT NULL
    //       GROUP BY "b"."id"
    //       ORDER BY "orderCount" DESC
    //       LIMIT 10
    //     `;
    const myProductData: ResponseProduct[] = await this.prismaService.$queryRaw`
    SELECT "p".*, SUM("quantity") as "orderCount"
    FROM "orders" "o"
    INNER JOIN "products" "p" ON "o"."productId" = "p"."id"
    WHERE "p"."delete" = false
    GROUP BY "p"."id"
    ORDER BY "orderCount" DESC
    LIMIT 10
  `;


    // Convert BigInt to regular numbers or strings
    const myProduct = myProductData.map((product) => ({
      ...product,
      orderCount: Number(product.orderCount), // Convert to number
    }));

    return myProduct.map((product) => new ResponseProduct(product));
  }

  async bestDiscountProducts() {
    const myProductData: ResponseProduct[] = await this.prismaService.$queryRaw`
        SELECT "P".*
        FROM "products" "P" 
        WHERE "P"."delete" = false
        ORDER BY "discount" DESC
        LIMIT 10
      `;

    // Convert BigInt to regular numbers or strings
    const myProduct = myProductData.map((product) => ({
      ...product,
    }));

    return myProduct.map((product) => new ResponseProduct(product));
  }
}
