import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from "@nestjs/config";
import * as bcrypt from 'bcrypt';
import {User, UserDB} from "../users/type";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService) {
    }

    async signIn(email: string, pass: string): Promise<{ access_token: String,refresh_token:String }> {
        const user:UserDB|null = await this.usersService.findOne(email);
        if(!user) throw new UnauthorizedException();
        if (user.password !== pass) {
            throw new UnauthorizedException();
        }
        const access_token = this.generateAccessToken(user);
        const refresh_token = this.generateRefreshToken(user);
        await this.updateRefreshToken(user.id, refresh_token);
        return {access_token, refresh_token};
    }
    async register(user: User) {
        return await this.usersService.create(user);
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
        await this.usersService.updateRefreshToken(id, hashedToken)
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
            await this.usersService.updateRefreshToken(user.id, newRefreshToken);

            return { access_token: accessToken, refresh_token: newRefreshToken };
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }
    async logout(userId: string) {
        return this.usersService.logout(userId);
    }

}
