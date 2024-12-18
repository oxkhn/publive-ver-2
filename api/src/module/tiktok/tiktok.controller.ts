import { TiktokService } from './tiktok.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { GetVideoDto } from './dto/GetTiktok.dto';
import {
  PaginatedResponseSuccess,
  ResponseSuccess,
} from 'src/common/interfaces/response.interface';

@Controller('tiktok')
export class TiktokController {
  constructor(private readonly tiktokService: TiktokService) {}

  @Post()
  async getAllVideo(@Body() getVideoDto: GetVideoDto) {
    try {
      const { videos, totalPage, nextPage } =
        await this.tiktokService.getAllVideo(getVideoDto);

      return new PaginatedResponseSuccess(
        videos,
        HttpStatus.OK,
        'Success',
        totalPage,
        nextPage,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get(':keyworld')
  async syncData(@Param('keyworld') keyworld: string) {
    try {
      const res = await this.tiktokService.runFetchDataTiktokVideo({
        keyword: keyworld,
        pages: 5,
      });

      return new ResponseSuccess('');
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
