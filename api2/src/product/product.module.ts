import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UploadService } from 'src/upload/upload.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/(share)/schemas/product.schema';
import { UploadS3Service } from 'src/upload-s3/upload-s3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, UploadService, UploadS3Service],
})
export class ProductModule {}
