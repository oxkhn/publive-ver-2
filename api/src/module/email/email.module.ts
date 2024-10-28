import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CampaignEmail,
  CampaignEmailSchema,
} from 'src/common/models/campaignEmail.model';
import { Partner, PartnerSchema } from 'src/common/models/partner.model';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './email.processor';
import {
  EmailCustom,
  EmailCustomSchema,
} from 'src/common/models/emailCustom.model';
import { UploadS3Service } from '../upload-s3/upload-s3.service';
import { MailLog, MailLogSchema } from 'src/common/models/mailLog.model';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6079,
      },
    }),
    BullModule.registerQueue({
      name: 'emailQueue',
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'affiliate.publive@gmail.com',
          pass: 'tibv sawa gytg nrvd',
        },
      },
      defaults: {
        from: '"PUBLive" <no-reply@example.com>',
      },
    }),
    MongooseModule.forFeature([
      { name: CampaignEmail.name, schema: CampaignEmailSchema },
      { name: Partner.name, schema: PartnerSchema },
      { name: EmailCustom.name, schema: EmailCustomSchema },
      { name: MailLog.name, schema: MailLogSchema },
    ]),
  ],
  controllers: [EmailController],
  providers: [EmailService, EmailProcessor, UploadS3Service],
})
export class EmailModule {}
