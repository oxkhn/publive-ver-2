import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  HttpException,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadS3Service } from './upload-s3.service';
import { multerOptions } from 'src/common/utils/UploadUtils';
import { ResponseSuccess } from 'src/common/interfaces/response.interface';

@Controller('upload-s3')
export class UploadS3Controller {
  constructor(private readonly uploadService: UploadS3Service) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const res = await this.uploadService.uploadFile(
        file.fieldname,
        file.buffer,
      );

      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}