import { IsString, IsNumber, IsArray, IsOptional, ArrayNotEmpty } from 'class-validator';

class CreatePetDto {

  @IsString()
  ownerId: string;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;

  @IsString()
  gender: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  photos: string[];

}

export { CreatePetDto };
