import { Module } from '@nestjs/common';
import { UploadS3Controller } from './upload-s3.controller';
import { UploadS3Service } from './upload-s3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [UploadS3Controller],
  providers: [UploadS3Service],
})
export class UploadS3Module {}
