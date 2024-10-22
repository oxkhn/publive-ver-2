import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema } from 'src/common/models/campaign.model';
import { UploadS3Service } from '../upload-s3/upload-s3.service';
import { Affiliate, AffiliateSchema } from 'src/common/models/affiliate.model';
import { ProductService } from '../product/product.service';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
      { name: Affiliate.name, schema: AffiliateSchema },
    ]),
  ],
  controllers: [CampaignController],
  providers: [CampaignService, UploadS3Service],
})
export class CampaignModule {}
