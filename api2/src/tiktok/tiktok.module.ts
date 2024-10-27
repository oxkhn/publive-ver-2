import { Module } from '@nestjs/common';
import { TiktokController } from './tiktok.controller';
import { TiktokService } from './tiktok.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoTiktok, VideoTiktokSchema } from 'src/(share)/schemas/tiktok.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: VideoTiktok.name, schema: VideoTiktokSchema }]),
  ],
  controllers: [TiktokController],
  providers: [TiktokService],
})
export class TiktokModule {}
