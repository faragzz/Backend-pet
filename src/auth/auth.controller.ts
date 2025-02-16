import {Body, Controller, Post, Request, HttpCode, HttpStatus, UseGuards, Get} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthGuard} from "./auth.guard";
import {Public} from "../../Guards/guards";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, string>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
