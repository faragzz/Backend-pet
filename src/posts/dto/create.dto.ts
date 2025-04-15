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

class LocationDto {
  @IsString()
  @IsIn(['Point'])
  type: 'Point';

  @IsArray()
  @IsNumber({}, { each: true })
  coordinates: number[];
}

class CreatePostDto {
  @IsString()
  petId: string;

  @IsString()
  userId: string;

  @IsString()
  title: string;

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
