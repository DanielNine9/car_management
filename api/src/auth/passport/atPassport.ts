import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JWTPayload } from '../type/type';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly prismaService: PrismaService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpires: false,
      secretOrKey: configService.get("ACCESS_TOKEN"),
    });
  }

  async validate(payload: JWTPayload): Promise<any> {
    const user = await this.prismaService.user.findUnique(
      {
        where: {
          id: payload.sub
        },
        select: {
          role: true,
          id: true,
          address: true,
          banned: true
        }
      }
    );
    if (!user) {
      throw new UnauthorizedException("Account not found");
    }
    if (user.banned) {
      throw new ForbiddenException("Account is banned")
    }

    return user;
  }
}
