import { Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { Public } from '../auth/guards/guards';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {
  }

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file')) // 'file' should match the form field name
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'No file uploaded' };
    }

    return this.imageService.uploadFile(
      file.buffer,
      file.originalname,
      '/uploads',
    );
  }

  @Public()
  @Delete(':fileId')
  async deleteImage(@Param('fileId') fileId: string) {
    return this.imageService.deleteFile(fileId);
  }

}
