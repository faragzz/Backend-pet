import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyOtpDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
