declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { TiktokService } from './module/tiktok/tiktok.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
  });

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Apply the global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  const tiktokService = await app.resolve(TiktokService);
  // tiktokService.fetchTikTokSearch({ keyword: 'Taytebaochet', pages: 10 });

  await app.listen(7654);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
