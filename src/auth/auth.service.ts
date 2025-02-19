import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserDTO } from '../users/dto/user';
import { User, UserDocument } from '../users/schema/user.schema';
import { EmailService } from '../email/email.service';
import * as speakeasy  from 'speakeasy';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: EmailService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
  }

  async signIn(email: string, pass: string): Promise<{ access_token: String, refresh_token: String }> {
    const user = await this.usersService.findOne(email);
    if (!user) throw new UnauthorizedException();
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const access_token = this.generateAccessToken(user);
    const refresh_token = this.generateRefreshToken(user);
    await this.updateRefreshToken(user.email, refresh_token);
    return { access_token, refresh_token };
  }

  async register(user: UserDTO): Promise<User> {
    const createdUser = await this.usersService.create(user);
    if (!createdUser) throw new UnauthorizedException();
    // try {
    //   await this.mailService.sendMail(
    //     createdUser.email,
    //     "Created Account in Pet's App",
    //     "Welcome to Pet's App!"
    //   );
    // } catch (error) {
    //   console.error("⚠️ Failed to send welcome email:", error.message);
    // }
    return createdUser;
  }


  private generateAccessToken(user: any) {
    return this.jwtService.sign(
      { sub: user.id, username: user.username },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '15m',
      },
    );
  }

  private generateRefreshToken(user: any) {
    return this.jwtService.sign(
      { sub: user.id },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateRefreshToken(id, hashedToken);
  }

  async refreshTokens(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      // ✅ Find the user in-memory
      const user = await this.usersService.findOne(decoded.sub);
      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // ✅ Generate new tokens
      const accessToken = this.generateAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      // ✅ Update the user's refresh token in-memory
      await this.usersService.updateRefreshToken(user.email, newRefreshToken);

      return { access_token: accessToken, refresh_token: newRefreshToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async generateOTP(email:string){
    const secret = speakeasy.generateSecret({ length: 20 });
    const token = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
    });
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    user.otp_key = secret.base32;
    await user.save();
    //sent mail
    try {
      await this.mailService.sendMail(
        user.email,
        "Recover your Pet's Account",
        `OTP : ${token}`,
      );
    } catch (error) {
      console.error("⚠️ Failed to send OTP to Email:", error.message);
    }
  }

  async verifyOTP(email:string , token:string){
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    const secret = user.otp_key;
    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1,
    });
    if(!verified)return null;
    const access_token = this.generateAccessToken(user);
    const refresh_token = this.generateRefreshToken(user);
    await this.updateRefreshToken(user.email, refresh_token);
    return { access_token, refresh_token };
  }

  async logout(userId: string) {
    return this.usersService.logout(userId);
  }

}
