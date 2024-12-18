import { Module } from '@nestjs/common';
import { TiktokController } from './tiktok.controller';
import { TiktokService } from './tiktok.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VideoTiktok,
  VideoTiktokSchema,
} from 'src/common/models/tiktok.schema';
import { TiktokVideo, TiktokVideoSchema } from 'src/common/models/tiktokVideo.model';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: VideoTiktok.name, schema: VideoTiktokSchema },
      { name: TiktokVideo.name, schema: TiktokVideoSchema },
    ]),
  ],
  controllers: [TiktokController],
  providers: [TiktokService],
})
export class TiktokModule {}
