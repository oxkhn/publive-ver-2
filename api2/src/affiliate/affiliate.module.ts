import { Module } from '@nestjs/common';
import { AffiliateController } from './affiliate.controller';
import { AffiliateService } from './affiliate.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Affiliate,
  AffiliateSchema,
} from 'src/(share)/schemas/affiliate.schema';
import { UploadService } from 'src/upload/upload.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Affiliate.name, schema: AffiliateSchema },
    ]),
  ],
  controllers: [AffiliateController],
  providers: [AffiliateService, UploadService],
})
export class AffiliateModule {}
