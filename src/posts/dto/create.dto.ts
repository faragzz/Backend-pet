import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsDefined,
  IsOptional,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePetDto } from '../../pet/dto/create.dto';

class LocationDto {
  @IsString()
  @IsIn(['Point']) // Only allow 'Point'
  type: 'Point';

  @IsArray()
  @IsNumber({}, { each: true })
  coordinates: number[];
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
