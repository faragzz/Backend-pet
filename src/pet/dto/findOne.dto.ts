import { IsString } from 'class-validator';

class FindOneDto {
  @IsString()
  id: string;
}

export { FindOneDto };
