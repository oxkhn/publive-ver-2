import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  PaginatedResponseSuccess,
  ResponseSuccess,
} from 'src/common/interfaces/response.interface';
import { readExcelFileWithImage } from 'src/common/utils/FormatCsvUtils';
import {
  multerOptions,
  SUPPORTED_FILES_EXCEL,
} from 'src/common/utils/UploadUtils';
import { ProductService } from './product.service';
import { GetProductDto } from 'src/common/dto/ProductGetAll.dto';
import { Product } from 'src/common/models/product.model';
import { CreateProductDto } from 'src/common/dto/ProductCreate.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create/csv')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async createProductFromCSV(
    @UploadedFile() file,
    @Body() body: { productType: number },
  ) {
    try {
      if (!file) {
        throw new HttpException(
          `Please provide correct file name with extension ${JSON.stringify(SUPPORTED_FILES_EXCEL)}`,
          400,
        );
      }

      await this.productService.createProductFromFile(file, body.productType);

      return new ResponseSuccess('File uploaded successfully');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  async getAll(@Body() getProductData: GetProductDto) {
    try {
      const { products, totalPages, nextPage, currentPage, totalItems } =
        await this.productService.getAllProducts(getProductData);

      return new PaginatedResponseSuccess<Product>(
        products,
        HttpStatus.OK,
        'Products retrieved successfully.',
        totalPages,
        nextPage,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('update-stock')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async updateStock(@UploadedFile() file) {
    try {
      const res = await this.productService.updateStock(file);
      return new ResponseSuccess('File uploaded successfully');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/categories')
  async getCategories() {
    try {
      const res = await this.productService.getCategories();
      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('create-or-update')
  async postProductDetail(@Body() product: CreateProductDto) {
    try {
      const res = await this.productService.createOrUpdate(product);
      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
