import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePetDto } from './create.dto';

class UpdatePetDto {
  @IsString()
  id: string;

  @ValidateNested()
  @Type(() => CreatePetDto)
  pet: CreatePetDto;
}

export { UpdatePetDto };
