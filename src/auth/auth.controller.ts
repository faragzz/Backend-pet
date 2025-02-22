import { Body, Controller, Post, Request, HttpCode, HttpStatus, Get, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../../Guards/guards';
import { UserDTO } from '../users/dto/user';
import { UsersService } from '../users/users.service';
import { User } from '../users/schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
              private userService: UsersService) {
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('hello')
  hello() {
    return "Helloz";
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
  register(@Body() user: UserDTO): Promise<User> {
    return this.authService.register(user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('users')
  getAll() {
    return this.userService.findAll();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Delete('delete-all')
  async deleteAll() {
    return this.userService.deleteAll();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('generate-otp')
  async generateOTP(@Body() body: { email: string }) {
    return this.authService.generateOTP(body.email);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify-otp')
  async verifyOTP(@Body() body: { email: string, token: string }) {
    return this.authService.verifyOTP(body.email,body.token);
  }

  @Post('update-password')
  async updatePassword(@Body() body: { email: string, password: string }) {
    return this.userService.updatePassword(body.email, body.password);
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
