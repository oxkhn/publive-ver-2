import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema } from 'src/(share)/schemas/campaign.schema';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { UploadS3Service } from 'src/upload-s3/upload-s3.service';
import { ConfigModule } from '@nestjs/config';
import { Email, EmailSchema } from 'src/(share)/schemas/email.schema';
import { UploadService } from 'src/upload/upload.service';
import { MailService } from 'src/email/MailService';
import { MailLog, MailLogSchema } from 'src/(share)/schemas/mailLog.schema';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from 'src/email/EmailProcessor';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
      { name: Email.name, schema: EmailSchema },
      { name: MailLog.name, schema: MailLogSchema },
    ]),
    BullModule.registerQueue({
      name: 'emailQueue',
    }),
  ],
  controllers: [CampaignController],
  providers: [CampaignService, UploadS3Service, UploadService, MailService],
})
export class CampaignModule {}
