import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWTPayload } from '../type/type';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'rt') {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.['refresh-token'];
        },
      ]),
      secretOrKey: configService.get('ACCESS_TOKEN'),
    });
  }

  async validate(payload: any) {
    const user = await this.prismaService.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}

