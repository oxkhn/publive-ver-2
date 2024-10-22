import { ResponseSuccess } from 'src/common/interfaces/response.interface';
import { ScrapeService } from './scrape.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

@Controller('scrape')
export class ScrapeController {
  constructor(private readonly scrapeService: ScrapeService) {}
}
