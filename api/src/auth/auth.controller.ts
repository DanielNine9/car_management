import { Controller, Get, Post, Body, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import { atGuard } from 'src/common/guard/';
import { User } from 'src/common/decorator/userInfo.decorator';
import { Public } from 'src/common/decorator/public.decorator';
import { Response, Request } from 'express'
import { PassThrough } from 'stream';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post("login")
    login(@Body() loginDTO: LoginDTO, @Res({ passthrough: true }) res: Response) {
        return this.authService.login(loginDTO, res);
    }

    @Public()
    @Post("register")
    register(@Body() registerDto: RegisterDTO) {
        return this.authService.register(registerDto)
    }

    @UseGuards(atGuard)
    @Get("me")
    me(@User() user) {
        return this.authService.me(user)
    }

    @Public()
    @Get("refresh-token")
    refreshToken(@Req() req: Request) {
        return this.authService.refreshToken(req)
    }

    @Post("logout")
    logout(@User() user, @Res({ passthrough: true }) res: Response) {
        return this.authService.logout(user, res)
    }

}
