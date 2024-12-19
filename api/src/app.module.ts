import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './module/auth/auth.module';
import { TestModule } from './module/test/test.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './module/user/user.module';
import { ScrapeModule } from './module/scrape/scrape.module';
import { ProductModule } from './module/product/product.module';
import { CampaignModule } from './module/campaign/campaign.module';
import { UploadS3Module } from './module/upload-s3/upload-s3.module';
import { EmailModule } from './module/email/email.module';
import { BullModule } from '@nestjs/bullmq';
import { FormRegisterModule } from './module/form-register/form-register.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FootageModule } from './module/footage/footage.module';
import { CrmModule } from './module/crm/crm.module';
import { TiktokModule } from './module/tiktok/tiktok.module';
import { TrackingModule } from './module/tracking/tracking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    TestModule,
    UserModule,
    ScrapeModule,
    ProductModule,
    CampaignModule,
    UploadS3Module,
    EmailModule,
    FormRegisterModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    FootageModule,
    CrmModule,
    TiktokModule,
    TrackingModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
