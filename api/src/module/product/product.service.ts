import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from 'src/common/dto/ProductCreate.dto';
import { GetProductDto } from 'src/common/dto/ProductGetAll.dto';
import { Product } from 'src/common/models/product.model';
import { readExcelFileWithImage } from 'src/common/utils/FormatCsvUtils';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async createProductFromFile(file, productType: number) {
    try {
      const processData = readExcelFileWithImage(file.path);

      for (let i = 0; i < processData.length; i++) {
        const data = processData[i];

        data.commission =
          typeof data.commission !== 'number' ? 0 : data.commission;
        data.type = productType;

        const oldProduct = await this.productModel.findOne({
          sku: data.sku,
          type: productType,
        });

        if (oldProduct) {
          await this.productModel.findOneAndUpdate({ sku: data.sku }, data);
        } else {
          const newProduct = new this.productModel(data);
          await newProduct.save();
        }
      }

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
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
        limit = 1000,
        page = 1,
        cat,
        commission,
        name,
        bu,
        brand,
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

      if (bu && bu.toLowerCase() !== '') {
        query.bu = bu;
      }

      if (brand && brand.toLowerCase() !== '') {
        query.brand = brand;
      }

      if (cat && cat.toLowerCase() !== '') {
        query.cat = cat;
      }

      if (Array.isArray(publisher)) {
        // If publisher is an array, check if it's not empty
        if (publisher.length > 0) {
          query.publisher = publisher;
        }
      }

      if (filterType) {
        query.type = filterType;
      }

      const nameSkuConditions: any[] = [];

      if (name && name.trim() !== '') {
        nameSkuConditions.push({
          productName: { $regex: name.trim(), $options: 'i' },
        });
      }

      if (sku && sku.trim() !== '') {
        nameSkuConditions.push({ sku: { $regex: sku.trim(), $options: 'i' } });
      }

      if (nameSkuConditions.length > 0) {
        query.$or = nameSkuConditions;
      }

      if (commission != null) {
        const commissionNumber = Number(commission);
        if (isNaN(commissionNumber)) {
          throw new BadRequestException('Commission phải là một số.');
        }
        query.commission = { $lt: commissionNumber };
      }

      const sortCriteria: any = {};
      if (sortBy) {
        const sortOrderValue = sortOrder.toLowerCase() === 'desc' ? -1 : 1;
        sortCriteria[sortBy] = sortOrderValue;
      }

      const totalDocuments = await this.productModel
        .countDocuments(query)
        .exec();
      const totalPages = Math.ceil(totalDocuments / sanitizedLimit);
      const nextPage =
        sanitizedPage + 1 > totalPages ? null : sanitizedPage + 1;

      const products = await this.productModel
        .find(query)
        .sort(sortCriteria)
        .skip((sanitizedPage - 1) * sanitizedLimit)
        .limit(sanitizedLimit)
        .lean()
        .exec();

      return {
        products,
        totalPages,
        nextPage,
        currentPage: sanitizedPage,
        totalItems: totalDocuments,
      };
    } catch (error) {
      throw new BadRequestException('Failed to get all products');
    }
  }

  async getProduct(sku: string) {
    try {
      const product = await this.productModel.findOne({ sku });
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateStock(file) {
    try {
      const processData = readExcelFileWithImage(file.path);

      for (let i = 0; i < processData.length; i++) {
        const data = processData[i];

        const oldProduct = await this.productModel.findOne({ sku: data.sku });

        if (oldProduct) {
          await this.productModel.findOneAndUpdate(
            { sku: data.sku },
            {
              availableStock: data.availableStock,
            },
          );
        }
      }

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
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

  async createOrUpdate(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const { sku } = createProductDto;
      const existingProduct = await this.productModel.findOne({ sku }).exec();
      if (existingProduct) {
        await this.productModel.updateOne({ sku }, createProductDto).exec();
        return this.productModel.findOne({ sku }).exec();
      } else {
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async postIsActiveStock(sku: string, status: boolean) {
    try {
      const product = await this.productModel.find({ sku });
      if (!product) throw new BadRequestException('Product not found!');

      await this.productModel
        .findOneAndUpdate({ sku }, { isActive: status })
        .exec();

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
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
}
