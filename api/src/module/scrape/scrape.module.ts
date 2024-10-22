import { Module } from '@nestjs/common';
import { ScrapeController } from './scrape.controller';
import { ScrapeService } from './scrape.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ScrapeController],
  providers: [ScrapeService],
})
export class ScrapeModule {}
