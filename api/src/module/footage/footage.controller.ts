import {
  Body,
  Controller,
  HttpException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateFootageDto } from 'src/common/dto/CreateFootage.dto';
import { FootageService } from './footage.service';
import { ResponseSuccess } from 'src/common/interfaces/response.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadS3Service } from '../upload-s3/upload-s3.service';

@Controller('footage')
export class FootageController {
  constructor(
    private readonly footageService: FootageService,
    private readonly uploadS3Service: UploadS3Service,
  ) {}

  @Post('create-or-update')
  @UseInterceptors(FileInterceptor('file'))
  async createOrUpdate(
    @Body() body: CreateFootageDto,
    file: Express.Multer.File,
  ) {
    try {
      if (file) {
        const url = await this.uploadS3Service.uploadFile(
          file.originalname,
          file.buffer,
        );

        body.thumbnailUrl = url;
      }

      const res = await this.footageService.createOrUpdate(body);
      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
