import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { CampaignModule } from './campaign/campaign.module';
import { UploadModule } from './upload/upload.module';
import mongoose from 'mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { MailService } from './email/MailService';
import { ProductModule } from './product/product.module';
import { BullModule } from '@nestjs/bull';
import { EmailGateway } from './email/EmailGateway';
import { EmailProcessor } from './email/EmailProcessor';
import { MailLog, MailLogSchema } from './(share)/schemas/mailLog.schema';
import { AuthModule } from './auth/auth.module';
import { UploadS3Module } from './upload-s3/upload-s3.module';
import { TiktokModule } from './tiktok/tiktok.module';
import { AffiliateModule } from './affiliate/affiliate.module';
import { FormModule } from './form/form.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: MailLog.name, schema: MailLogSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    CampaignModule,
    UploadModule,
    ProductModule,
    AuthModule,
    UploadS3Module,
    TiktokModule,
    AffiliateModule,
    FormModule,
    
  ],
  controllers: [],
  providers: [MailService, EmailGateway, EmailProcessor],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    mongoose.connection.on('connected', () => {
      this.logger.log('Connected to the database');
    });

    mongoose.connection.on('error', (err) => {
      this.logger.error(`Database connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      this.logger.warn('Disconnected from the database');
    });
  }
}
