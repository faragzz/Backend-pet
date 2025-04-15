import { IsString, IsNumber, IsArray, ArrayNotEmpty, ValidateNested, IsDefined, IsOptional } from 'class-validator';
import { Pet } from '../../pet/schema/pet.schema';
import { Type } from 'class-transformer';
import { CreatePetDto } from '../../pet/dto/create.dto';

class LocationDto {
  @IsString()
  type: 'Point';

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  coordinates: [number, number];
}

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

  @IsDefined()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  matches?: string[];
}

export { CreatePostDto };
