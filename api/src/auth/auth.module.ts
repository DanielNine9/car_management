import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './passport/atPassport';

@Module({
  imports: [JwtModule.register({
    secret: process.env.ACCESS_TOKEN,
    // signOptions: {
    //   expiresIn: 3600
    // }
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})

export class AuthModule {

}
