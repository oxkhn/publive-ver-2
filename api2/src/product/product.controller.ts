import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { multerOptions, SUPPORTED_FILES_EXCEL } from 'src/utils/Upload';
import { ProductService } from './product.service';
import { PaginatedResponseSuccess, ResponseSuccess } from 'src/utils/Response';
import { GetProductDto } from './dto/GetProduct.dto';
import { ApiResponse, PaginatedApiResponse } from 'src/utils/ApiResponse';
import { Product } from 'src/(share)/schemas/product.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create/csv')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async createProductFromCSV(
    @UploadedFile() file,
    @Body() body: { type: string },
  ) {
    try {
      if (!file) {
        throw new HttpException(
          `Please provide correct file name with extension ${JSON.stringify(SUPPORTED_FILES_EXCEL)}`,
          400,
        );
      }

      await this.productService.createProductFromFile(file, body.type);

      return new ResponseSuccess('File uploaded successfully');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/brand')
  async getBrand() {
    try {
      const res = await this.productService.getCategoriesWithBrands();
      return new ResponseSuccess(res);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get('/categorys')
  async getCategory() {
    try {
      const res = await this.productService.getCategories();
      return new ResponseSuccess(res);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post()
  async getAllProducts(@Body() getProductData: GetProductDto) {
    try {
      const { products, totalPages, nextPage, currentPage, totalItems } =
        await this.productService.getAllProducts(getProductData);

      return new PaginatedApiResponse<Product>(
        products,
        totalItems,
        currentPage,
        getProductData.limit || 10,
        'Products retrieved successfully.',
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/:productId')
  async getProductById(@Param('productId') productId: string) {
    try {
      const product = await this.productService.getProductById(productId);
      return new ResponseSuccess(product);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/:productId')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'listImage', maxCount: 10 },
    ]),
  )
  async editProduct(
    @Param('productId') productId: string,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      listImage?: Express.Multer.File[];
    },
    @Body() body: any,
  ) {
    try {
      // Extract files
      const avatar = files.avatar ? files.avatar[0] : null;
      const listImage = files.listImage || [];

      // Validate avatar (single file)
      if (avatar && !this.isValidImage(avatar)) {
        throw new BadRequestException('Avatar file is not a valid image');
      }

      const res = await this.productService.createOrUpdateProduct(
        productId,
        body,
        avatar,
        listImage,
      );

      return new ResponseSuccess(res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private isValidImage(file: Express.Multer.File): boolean {
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validMimeTypes.includes(file.mimetype);
  }

  @Delete('/:sku')
  async deleteProduct(@Param('sku') sku: string) {
    try {
      const res = await this.productService.deleteProduct(sku);

      return new ResponseSuccess('');
    } catch (error) {
      throw new BadRequestException('');
    }
  }

  @Post()
  async getProductByArray() {
    try {
    } catch (error) {
      throw new BadRequestException('');
    }
  }
}
