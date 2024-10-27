import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadS3Service } from './upload-s3.service';
import { ResponseSuccess } from 'src/utils/Response';

@Controller('upload-s3')
export class UploadS3Controller {
  constructor(private readonly uploadService: UploadS3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      let imageRes = await this.uploadService.uploadFile(
        file.originalname,
        file.buffer,
      );

      return new ResponseSuccess(imageRes, 'Image upload successfully');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
