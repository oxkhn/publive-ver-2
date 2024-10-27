import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { AllExceptionsFilter } from './utils/AllExceptionsFilter';
import { ValidationPipe } from '@nestjs/common';
import { MailService } from './email/MailService';
import { TiktokService } from './tiktok/tiktok.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const config = new DocumentBuilder()
    .setTitle('Booking example')
    .setDescription('The booking API description')
    .setVersion('1.0')
    .addTag('Booking')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const tiktokService = await app.resolve(TiktokService);
  // tiktokService.fetchTikTokSearch({ keyword: 'Unilever', pages: 5 });

  app.use(helmet());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(2072);
}

bootstrap();
