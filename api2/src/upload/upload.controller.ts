import {
  Body,
  Controller,
  HttpException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { multerOptions, SUPPORTED_FILES } from 'src/utils/Upload';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  
}
