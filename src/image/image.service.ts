import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';
import { UploadResponse } from 'imagekit/dist/libs/interfaces';

@Injectable()
export class ImageService {
  private imagekit: ImageKit;

  constructor() {
    this.imagekit = new ImageKit({
      publicKey: 'public_MMUPxtwhba4PDkEpELbrWw6Xg+c=',
      privateKey: 'private_Iz402t+LnkwrsMvzHSbhxwr6d/8=',
      urlEndpoint: 'https://ik.imagekit.io/dlwvbwjkbw',
    });
  }

  async uploadFile(file: Buffer, fileName: string, folder: string):Promise<UploadResponse> {
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
