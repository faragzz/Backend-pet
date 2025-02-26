import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Public } from '../auth/guards/guards';
import { CreatePetDto } from './dto/create.dto';
import { PetService } from './pet.service';
import { FindAllPetsDto } from './dto/findAll.dto';
import { FindOneDto } from './dto/findOne.dto';
import { DeleteDto } from './dto/delete.dto';
import { UpdatePetDto } from './dto/update.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {
  }


  @Post('create')
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
