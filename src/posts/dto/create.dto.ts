import { IsString, IsNumber, IsArray, ArrayNotEmpty, ValidateNested, IsDefined, IsOptional } from 'class-validator';
import { Pet } from '../../pet/schema/pet.schema';
import { Type } from 'class-transformer';
import { CreatePetDto } from '../../pet/dto/create.dto';

class CreatePostDto {

  @IsDefined()
  @ValidateNested()
  @Type(() => CreatePetDto)
  pet: CreatePetDto;

  @IsString()
  title: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  coordinates: number[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  matches?: string[];
}

export { CreatePostDto };
