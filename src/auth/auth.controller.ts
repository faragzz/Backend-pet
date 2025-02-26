import { Body, Controller, Post, Request, HttpCode, HttpStatus, Get, Delete, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './guards/guards';
import { UserDTO } from '../users/dto/user';
import { UsersService } from '../users/users.service';
import { User } from '../users/schema/user.schema';
import { SignInDTO } from './dto/signInDTO.dto';
import { GenerateOtpDTO } from './dto/generateOTP.dto';
import { RefreshDTO } from './dto/refresh.dto';
import { VerifyOtpDTO } from './dto/verifyOTP.dto';
import { logoutDTO } from './dto/logout.dto';
import { FindAllUserDto } from '../users/dto/findAll.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
              private userService: UsersService) {
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('hello')
  hello() {
    return 'Helloz';
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDTO) {
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
  getAll(@Query() query: FindAllUserDto) {
    return this.userService.findAll(query.page, query.limit);
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
  async generateOTP(@Body() body: GenerateOtpDTO) {
    return this.authService.generateOTP(body.email);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify-otp')
  async verifyOTP(@Body() body: VerifyOtpDTO) {
    return this.authService.verifyOTP(body.email, body.token);
  }

  @Post('update-password')
  async updatePassword(@Body() body: SignInDTO) {
    return this.userService.updatePassword(body.email, body.password);
  }


  @Post('refreshToken')
  async refresh(@Body() body: RefreshDTO) {
    return this.authService.refreshTokens(body.refreshToken);
  }

  @Post('logout')
  async logout(@Body() body: logoutDTO) {
    return this.authService.logout(body.userId);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
