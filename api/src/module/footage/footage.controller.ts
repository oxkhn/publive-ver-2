import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateFootageDto } from 'src/common/dto/CreateFootage.dto';
import { FootageService } from './footage.service';
import {
  PaginatedResponseSuccess,
  ResponseSuccess,
} from 'src/common/interfaces/response.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadS3Service } from '../upload-s3/upload-s3.service';
import { Footage } from 'src/common/models/footage.model';
import { GetAllFootageDto } from 'src/common/dto/FootageGetAll.dto';

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
    @UploadedFile() file: Express.Multer.File,
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

  @Get(':id')
  async getDetail(@Param('id') id: string) {
    try {
      const res = await this.footageService.getDetail(id);

      return new ResponseSuccess(res);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @Post()
  async getAll(@Body() getFootageData: GetAllFootageDto) {
    try {
      const { res, totalPages, nextPage, currentPage, totalItems } =
        await this.footageService.getAll(getFootageData);

      return new PaginatedResponseSuccess<Footage>(
        res,
        HttpStatus.OK,
        'Products retrieved successfully.',
        totalPages,
        nextPage,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
