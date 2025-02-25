import { IsString } from 'class-validator';

class DeleteDto {
  @IsString()
  id: string;
}

export { DeleteDto };
