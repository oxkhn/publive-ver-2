import { Module } from '@nestjs/common';
import { FootageController } from './footage.controller';
import { FootageService } from './footage.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Footage, FootageSchema } from 'src/common/models/footage.model';
import { UploadS3Service } from '../upload-s3/upload-s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Footage.name, schema: FootageSchema }]),
  ],
  controllers: [FootageController],
  providers: [FootageService, UploadS3Service],
  exports: [FootageService],
})
export class FootageModule {}
