import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions, SUPPORTED_FILES_EXCEL } from 'src/utils/Upload';
import { AffiliateService } from './affiliate.service';
import { PaginatedResponseSuccess, ResponseSuccess } from 'src/utils/Response';
import { GetAffiliateDto } from './dto/GetAffiliate.dto';

@Controller('affiliate')
export class AffiliateController {
  constructor(private readonly affilateService: AffiliateService) {}

  @Post('create/csv')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async createFromCSV(@UploadedFile() file) {
    try {
      if (!file) {
        throw new HttpException(
          `Please provide correct file name with extension ${JSON.stringify(SUPPORTED_FILES_EXCEL)}`,
          400,
        );
      }

      await this.affilateService.createFromCSV(file);

      return new ResponseSuccess('File uploaded successfully');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('')
  async GetAllAffiliate(@Body() getAffilidateDto: GetAffiliateDto) {
    try {
      const { affiliate, totalPage, nextPage } =
        await this.affilateService.getAll(getAffilidateDto);

      return new PaginatedResponseSuccess(
        affiliate,
        HttpStatus.OK,
        'Success',
        totalPage,
        nextPage,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
