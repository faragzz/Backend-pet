import { IsEmail, IsNotEmpty } from 'class-validator';

export class logoutDTO {
  @IsEmail()
  @IsNotEmpty()
  userId: string
}
