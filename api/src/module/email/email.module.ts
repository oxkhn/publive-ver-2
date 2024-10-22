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

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6380,
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
    ]),
  ],
  controllers: [EmailController],
  providers: [EmailService, EmailProcessor],
})
export class EmailModule {}
