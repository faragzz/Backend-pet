import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';
import { Public } from '../../Guards/guards';

@Controller('pet')
export class PetController {
  @Public()
  @Post('upload')
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
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return {
      message: 'File uploaded successfully',
      filePath: `/uploads/${file.filename}`,
    };
  }
}
