import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { atGuard } from './common/guard/atGuard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot({isGlobal : true}),
  
    UserModule, ProductModule, OrderModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: atGuard, // Apply local strategy globally
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class AppModule { }
