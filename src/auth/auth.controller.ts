import {Body, Controller, Post, Request, HttpCode, HttpStatus, UseGuards, Get} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthGuard} from "./auth.guard";
import {Public} from "../../Guards/guards";
import {User} from "../users/type";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, string>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() user: User) {
        return this.authService.register(user);
    }

    @Post('refreshToken')
    async refresh(@Body() body: { refreshToken: string }) {
        return this.authService.refreshTokens(body.refreshToken);
    }
    @Post('logout')
    async logout(@Body() body: { userId: string }) {
        return this.authService.logout(body.userId);
    }
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
