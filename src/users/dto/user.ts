import {IsString, IsEmail, IsDate, IsOptional} from 'class-validator';
import {Type} from 'class-transformer';

type Role = 'admin' | 'user';

class UserDTO {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: Role;

    @IsOptional()
    @IsString()
    refreshToken: string | null;

    @Type(() => Date)
    @IsDate()
    createdAt: Date;

    @Type(() => Date)
    @IsDate()
    updatedAt: Date;
}

export {UserDTO};
