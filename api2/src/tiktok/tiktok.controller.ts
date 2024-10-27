import { PaginatedResponseSuccess, ResponseSuccess } from 'src/utils/Response';
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
import { ApiResponse } from 'src/utils/ApiResponse';

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
      const res = await this.tiktokService.fetchTikTokSearch({
        keyword: keyworld,
        pages: 5,
      });

      return new ApiResponse('')
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
