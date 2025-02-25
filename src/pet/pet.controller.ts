import { BadRequestException, Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';
import { Public } from '../../Guards/guards';
import { CreatePetDto } from './dto/create';
import { PetService } from './pet.service';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { FindAllPetsDto } from './dto/findAll.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {
  }

  // @Post('create')
  // @UseInterceptors(
  //   FileInterceptor('photo', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
  //       },
  //     }),
  //   }),
  // )
  // create(@UploadedFile() file: Express.Multer.File, @Body('data') body: CreatePetDto) {
  //   return this.petService.create(body, file);
  // }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') body: string,
  ) {
    let petData: CreatePetDto;
    try {
      petData = JSON.parse(body);
    } catch (error) {
      throw new BadRequestException('Invalid JSON format');
    }

    // Transform and validate the DTO
    const petDto = plainToInstance(CreatePetDto, petData);
    const errors = await validate(petDto);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.petService.create(petDto, file);
  }


  @Public()
  @Get('findAll')
  findAll(@Query() query: FindAllPetsDto) {
    return this.petService.findAll(query.page, query.limit);
  }

  @Post('findOne')
  findOne(@Body() body: { id: string }) {
    return this.petService.findOne(body.id);
  }

  @Post('update')
  update(@Body() body: { id: string, pet: CreatePetDto }) {
    return this.petService.update(body.id, body.pet);
  }

  @Post('delete')
  delete(@Body() body: { id: string }) {
    return this.petService.delete(body.id);
  }
}
