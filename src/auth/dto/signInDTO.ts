import { IsString, IsEmail } from 'class-validator';

export class SignInDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

}

