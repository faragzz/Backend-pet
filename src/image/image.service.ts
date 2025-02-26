import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';
import { UploadResponse } from 'imagekit/dist/libs/interfaces';

@Injectable()
export class ImageService {
  private imagekit: ImageKit;

  constructor() {
    const publicKey = process.env.ImagePublic;
    const privateKey = process.env.ImagePrivate;
    const urlEndpoint = process.env.ImageUrlEndpoint;

    if (!publicKey || !privateKey || !urlEndpoint) {
      throw new Error("Missing required ImageKit environment variables.");
    }

    this.imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });
  }


  async uploadFile(file: Buffer, fileName: string, folder: string): Promise<UploadResponse> {
    return this.imagekit.upload({
      file,
      fileName,
      folder,
    });
  }

  async deleteFile(fileId: string): Promise<{ success: boolean; message?: string }> {
    try {
      await this.imagekit.deleteFile(fileId);
      return { success: true, message: 'File deleted successfully' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
