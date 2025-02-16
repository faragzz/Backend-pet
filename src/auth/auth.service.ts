import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService) {
    }        // TODO: Generate a JWT and return it here

    async signIn(username: string, pass: string): Promise<{ access_token: String }> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = {sub: user.userId, username: user.username};
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return {access_token: await this.jwtService.signAsync(payload)};
    }
}
