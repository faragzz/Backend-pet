import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService:PostsService) {}

  @Post('create')
  async create(@Body() postData:CreatePostDto){
    return this.postService.create(postData);
  }

  @Delete('delete/:id')
  async delete(@Param('id')id:string) {
    return this.postService.delete(id);
  }
}
