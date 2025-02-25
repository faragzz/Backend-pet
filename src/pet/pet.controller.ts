import { BadRequestException, Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Public } from '../../Guards/guards';
import { CreatePetDto } from './dto/create.dto';
import { PetService } from './pet.service';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { FindAllPetsDto } from './dto/findAll.dto';
import { FindOneDto } from './dto/findOne.dto';
import { DeleteDto } from './dto/delete.dto';
import { UpdatePetDto } from './dto/update.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {
  }


  @Post('create')
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
  async create(
    @Body() body: CreatePetDto,
  ) {
    return this.petService.create(body);
  }


  @Public()
  @Get('findAll')
  findAll(@Query() query: FindAllPetsDto) {
    return this.petService.findAll(query.page, query.limit);
  }

  @Post('findOne')
  findOne(@Body() body: FindOneDto) {
    return this.petService.findOne(body.id);
  }

  @Post('update')
  update(@Body() body: UpdatePetDto) {
    return this.petService.update(body.id, body.pet);
  }

  @Post('delete')
  delete(@Body() body: DeleteDto) {
    return this.petService.delete(body.id);
  }
}
