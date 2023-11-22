import { ConflictException, Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseUser } from './dto/auth.dto';
import { typeUser } from '@prisma/client';
import * as argon from 'argon2'
import { JWTPayload, Login, Register } from './type/type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express'

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    getAcessToken(payload: JWTPayload) {
        return this.jwtService.sign(payload, { expiresIn: '1d' })
    }

    getRefreshToken(payload: JWTPayload) {
        return this.jwtService.sign(payload)
    }

    async login(login: Login, res: Response): Promise<{ id: number, access_token: String, username: string, role: string, imageURL: string }> {
        const existUser = await this.prismaService.user.findUnique({
            where: {
                email: login.email,
            },
        });

        if (!existUser) {
            throw new ForbiddenException('User or password aren\'t correct')
        }

        const authen = await argon.verify(existUser.password, login.password)
        if (!authen) {
            throw new ForbiddenException('User or password aren\'t correct')
        }
        if (existUser.banned) throw new ForbiddenException("Account is banned")
        const payload = { sub: existUser.id, role: existUser.role, address: existUser.address }
        const refreshToken = this.getRefreshToken(payload)
        res.cookie('refresh-token', refreshToken, { maxAge: 1000 * 60 * 60 * 24 })
        const updatedUser = await this.prismaService.user.update({
            where: {
                email: login.email,
            },
            data: {
                refreshToken
            },
        });
        return { id: updatedUser.id, access_token: this.getAcessToken(payload), username: updatedUser.username, role: updatedUser.role, imageURL: updatedUser.imageURL }
    }



    async register(registerDto: Register): Promise<ResponseUser> {
        const existingUser = await this.prismaService.user.findUnique({
            where: {
                email: registerDto.email,
            },
        });

        if (existingUser) {
            throw new ConflictException('Email is already taken');
        }

        const hashPassword = await argon.hash(registerDto.password);
        const username = registerDto.username ? registerDto.username : registerDto.email.split('@')[0]
        const imageURL = registerDto.imageURL ? registerDto.imageURL : null
        const newUser = await this.prismaService.user.create({
            data: {
                username,
                email: registerDto.email,
                role: typeUser.BUYER,
                password: hashPassword,
                banned: false,
                address: registerDto.address,
                imageURL: registerDto.imageURL
            },
            select: {
                username: true,
                email: true,
                address: true,
                role: true
            }
        });

        return newUser
    }

    async refreshToken(req: Request): Promise<{ access_token: string }> {
        if (req && req.cookies['refresh-token']) {
            const verify = this.jwtService.verify(req.cookies['refresh-token'], this.configService.get('ACCESS_TOKEN'))
            if (!verify) throw new ForbiddenException("refresh token isn't correct")
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: verify.sub
                }
            })
            if (!user) throw new ForbiddenException("user not found")
            if (user.banned) throw new ForbiddenException("Your account is banned")
            if (user.refreshToken !== req.cookies['refresh-token']) throw new ForbiddenException("refresh token isn't equal with user")
            const payload = { sub: user.id, role: user.role, address: user.address }

            return { access_token: this.getAcessToken(payload) }
        }
        throw new ForbiddenException("refresh token is expires")
    }


    async logout(user, res: Response) {
        const esixt = await this.prismaService.user.findUnique({
            where: {
                id: user.id
            }
        })
        if (!esixt) throw new ForbiddenException()
        await this.prismaService.user.update(
            {
                where: {
                    id: user.id
                },
                data: {
                    refreshToken: null
                }
            }
        )
        res.cookie("refresh-token", "", { maxAge: 0 })
        return {
            message: "successfully"
        }
    }


    async me(user) {
        const info = await this.prismaService.user.findUnique({ where: { id: user.id } })
        delete info.password
        delete info.refreshToken
        delete info.updated_at
        delete info.banned
        return info
    }
}
