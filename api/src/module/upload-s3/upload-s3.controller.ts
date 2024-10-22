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

@Controller('upload-s3')
export class UploadS3Controller {
  constructor(private readonly uploadService: UploadS3Service) {}
}
