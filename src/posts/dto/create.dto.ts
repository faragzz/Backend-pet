import { IsString, IsNumber, IsArray, ArrayNotEmpty, ValidateNested, IsDefined } from 'class-validator';
import { Pet } from '../../pet/schema/pet.schema';
import { Type } from 'class-transformer';

class CreatePostDto {

  @IsDefined()
  @ValidateNested()
  @Type(() => Pet)
  pet: Pet;

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
  @ArrayNotEmpty()
  @IsString({ each: true })
  matches: string[];

}

export { CreatePostDto };
