import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Product } from 'src/(share)/schemas/product.schema';
import { UploadService } from 'src/upload/upload.service';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { UploadS3Service } from 'src/upload-s3/upload-s3.service';
import { GetProductDto } from './dto/GetProduct.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly uploadService: UploadService,
    private readonly uploadS3Service: UploadS3Service,
  ) {}

  async createProductFromFile(file: Express.Multer.File, type: string) {
    try {
      const products = this.uploadService.readExcelFileWithImage(file.path);

      const updatedProducts = products.map((product: any) => ({
        ...product,
        type: type,
      }));

      await this.productModel
        .insertMany(updatedProducts, { ordered: false })
        .catch((err) => {
          this.logger.error(err);
        });

      return;
    } catch (error) {
      this.logger.error(`Failed to upload file`, error.stack);
      throw new BadRequestException('Failed to upload file');
    }
  }

  async getAllProducts(getProductData: GetProductDto): Promise<{
    products: Product[];
    totalPages: number;
    nextPage: number | null;
    currentPage: number;
    totalItems: number;
  }> {
    try {
      const {
        limit = 10,
        page = 1,
        cat,
        commission,
        name,
        bu,
        brand,
        startDate,
        endDate,
        publisher,
        sortBy,
        sortOrder = 'asc',
        sku,
        filterType = 1,
      } = getProductData;

      // Chuyển đổi và kiểm tra các giá trị limit và page
      const sanitizedLimit = Math.max(1, parseInt(limit.toString(), 10));
      const sanitizedPage = Math.max(1, parseInt(page.toString(), 10));

      const query: any = {};

      // Lọc theo bu
      if (bu && bu.toLowerCase() !== 'all' && bu.toLowerCase() !== '') {
        query.bu = bu;
      }

      // Lọc theo brand
      if (
        brand &&
        brand.toLowerCase() !== 'all' &&
        brand.toLowerCase() !== ''
      ) {
        query.brand = brand;
      }

      if (
        publisher &&
        publisher.toLowerCase() !== 'all' &&
        publisher.toLowerCase() !== ''
      ) {
        query.publisher = publisher;
      }

      // Lọc theo category
      if (cat && cat.toLowerCase() !== 'all' && cat.toLowerCase() !== '') {
        query.category = cat;
      }

      if (sku && sku.toLowerCase() !== '') {
        query.sku = sku;
      }

      if (filterType) {
        query.type = filterType;
      }

      if (
        publisher &&
        publisher.toLowerCase() !== 'all' &&
        publisher.toLowerCase() !== ''
      ) {
        query.publisher = publisher;
      }

      // Lọc theo tên sản phẩm với regex không phân biệt chữ hoa chữ thường
      if (name && name.trim() !== '') {
        query.productName = { $regex: name.trim(), $options: 'i' };
      }

      // Lọc theo commission nếu được cung cấp
      if (commission != null) {
        const commissionNumber = Number(commission);
        if (isNaN(commissionNumber)) {
          throw new BadRequestException('Commission phải là một số.');
        }
        query.commission = { $lt: commissionNumber }; // Thay đổi thành $gt nếu cần
      }

      // Lọc theo khoảng ngày startDate và endDate
      if (startDate || endDate) {
        query.startDate = {};

        if (startDate) {
          const parsedStartDate = new Date(startDate);
          if (isNaN(parsedStartDate.getTime())) {
            throw new BadRequestException('startDate không hợp lệ.');
          }
          query.startDate.$gte = parsedStartDate;
        }

        if (endDate) {
          const parsedEndDate = new Date(endDate);
          if (isNaN(parsedEndDate.getTime())) {
            throw new BadRequestException('endDate không hợp lệ.');
          }
          query.startDate.$lte = parsedEndDate;
        }
      }

      // Xác định tiêu chí sắp xếp
      const sortCriteria: any = {};
      if (sortBy) {
        const sortOrderValue = sortOrder.toLowerCase() === 'desc' ? -1 : 1;
        sortCriteria[sortBy] = sortOrderValue;
      }

      this.logger.debug(query);

      // Tính tổng số tài liệu và số trang
      const totalDocuments = await this.productModel
        .countDocuments(query)
        .exec();
      const totalPages = Math.ceil(totalDocuments / sanitizedLimit);
      const nextPage =
        sanitizedPage + 1 > totalPages ? null : sanitizedPage + 1;

      // Thực hiện truy vấn với phân trang, sắp xếp và tối ưu hóa
      const products = await this.productModel
        .find(query)
        .sort(sortCriteria)
        .skip((sanitizedPage - 1) * sanitizedLimit)
        .limit(sanitizedLimit)
        .lean() // Trả về đối tượng JavaScript đơn giản để tăng hiệu suất
        .exec();

      return {
        products,
        totalPages,
        nextPage,
        currentPage: sanitizedPage,
        totalItems: totalDocuments,
      };
    } catch (error) {
      this.logger.error(
        `Failed to get all products: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to get all products');
    }
  }

  async getProductById(id: string) {
    try {
      const product = await this.productModel.findById(id);

      if (!product) {
        throw new BadRequestException('Product not found');
      }

      return product;
    } catch (error) {
      this.logger.error(`Failed to get product by id`, error.stack);
      throw new BadRequestException('Failed to get product by id');
    }
  }

  async createOrUpdateProduct(
    productId: string,
    product: CreateProductDto,
    avatar: Express.Multer.File,
    listImage: Array<Express.Multer.File>,
  ) {
    try {
      let productExits = null;

      // Check if productId is a valid ObjectId
      if (isValidObjectId(productId)) {
        productExits = await this.productModel.findById(productId);
      }
      let avatarResult = '';
      if (avatar) {
        avatarResult = await this.uploadS3Service.uploadFile(
          'avatar_' + product.sku,
          avatar.buffer,
        );
      }

      let imageResults = [];
      if (listImage) {
        imageResults = await Promise.all(
          listImage.map((file, index) =>
            this.uploadS3Service.uploadFile(
              'image_' + product.sku + '_' + index,
              file.buffer,
            ),
          ),
        );
      }

      delete product['_id'];
      let editProduct = new this.productModel(product);

      editProduct['image'] = avatarResult
        ? avatarResult
        : productExits?.image || '';

      editProduct['imageList'] = imageResults
        ? imageResults
        : productExits?.imageList || [];

      if (productExits) {
        const res = await this.productModel.findOneAndUpdate(
          {
            sku: product.sku,
          },
          { $set: editProduct },
          { new: true, upsert: true },
        );

        return res;
      } else {
        editProduct['_id'] = undefined;
        editProduct.save();
        return editProduct;
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('s');
    }
  }

  async deleteProduct(sku: string) {
    try {
      const res = await this.productModel.findOneAndDelete({ sku: sku });

      return res;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getCategoriesWithBrands() {
    const products = await this.productModel.find().exec();

    const groupedData = products.reduce((acc, curr) => {
      const buIndex = acc.findIndex((item) => item.bu === curr.bu);
      if (buIndex !== -1) {
        // Chỉ thêm brand nếu chưa có trong danh sách brand của BU đó
        if (!acc[buIndex].brand.includes(curr.brand)) {
          acc[buIndex].brand.push(curr.brand);
        }
      } else {
        acc.push({ bu: curr.bu, brand: [curr.brand] });
      }
      return acc;
    }, []);

    return groupedData;
  }

  async getProductByArraySKU(SKUs: string[]) {
    try {
      const products = await this.productModel.find({
        sku: { $in: SKUs },
      });

      return products;
    } catch (error) {
      throw new BadRequestException('');
    }
  }

  async getCategories() {
    const products = await this.productModel.find().exec();

    const groupedData = products.reduce((acc, curr) => {
      // Tìm kiếm bu hiện tại trong acc
      const buIndex = acc.findIndex((item) => item.bu === curr.bu);

      if (buIndex !== -1) {
        // Nếu BU đã tồn tại, kiểm tra cat
        const catIndex = acc[buIndex].categories.findIndex(
          (cat) => cat.cat === curr.cat,
        );

        if (catIndex !== -1) {
          // Nếu cat đã tồn tại, thêm brand nếu chưa có
          if (!acc[buIndex].categories[catIndex].brands.includes(curr.brand)) {
            acc[buIndex].categories[catIndex].brands.push(curr.brand);
          }
        } else {
          // Nếu cat chưa tồn tại, thêm cat và brand
          acc[buIndex].categories.push({
            cat: curr.cat,
            brands: [curr.brand],
          });
        }
      } else {
        // Nếu BU chưa tồn tại, thêm BU với cat và brand
        acc.push({
          bu: curr.bu,
          categories: [
            {
              cat: curr.cat,
              brands: [curr.brand],
            },
          ],
        });
      }

      return acc;
    }, []);

    return groupedData;
  }
}
