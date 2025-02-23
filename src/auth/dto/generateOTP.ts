import { IsEmail, IsNotEmpty } from 'class-validator';

export class GenerateOtpDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
