import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Post,
  Request,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateFormDto } from 'src/common/dto/FormCreate.dto';
import { FormGetAllDto } from 'src/common/dto/FormGetAll.dto';
import { FormRegisterAffiliate } from 'src/common/models/formRegister.model';
import { ProductService } from '../product/product.service';
import { User } from 'src/common/models/user.model';

@Injectable()
export class FormRegisterService {
  constructor(
    @InjectModel(FormRegisterAffiliate.name)
    private readonly formRegisterModel: Model<FormRegisterAffiliate>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly productService: ProductService,
  ) {}

  async addForm(createFormDto: CreateFormDto, email: string) {
    try {
      const user = await this.userModel.findOne({ email: email });
      if (!user) throw new BadRequestException('User not found.');

      const newForm = new this.formRegisterModel(createFormDto);
      newForm.userId = user._id;
      await newForm.save();
    } catch (error) {
      throw new BadRequestException('');
    }
  }

  async getAll(body: FormGetAllDto) {
    try {
      const { limit = 100, page = 1, name } = body;

      const sanitizedLimit = Math.max(1, parseInt(limit.toString(), 10));
      const sanitizedPage = Math.max(1, parseInt(page.toString(), 10));

      const query: any = {};

      if (name && name.trim() !== '') {
        query.name = { $regex: name.trim(), $options: 'i' };
      }

      const skip = (page - 1) * limit;

      const totalDocuments = await this.formRegisterModel
        .countDocuments(query)
        .exec();
      const totalPages = Math.ceil(totalDocuments / sanitizedLimit);
      const nextPage =
        sanitizedPage + 1 > totalPages ? null : sanitizedPage + 1;

      const products = await this.formRegisterModel
        .find(query)
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
      throw new BadRequestException('');
    }
  }

  async getDetail(id: string) {
    try {
      let form = await this.formRegisterModel
        .findOne({
          _id: new Types.ObjectId(id),
        })
        .lean();

      if (!form) throw new BadRequestException('Cannot found form.');

      const products = [];
      for (let i = 0; i < form.productSKUs.length; i++) {
        const sku = form.productSKUs[i];
        const _product = await this.productService.getProduct(sku);
        products.push(_product);
      }

      form['products'] = products;
      return form;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getFormOfUser(email: string) {
    try {
      console.log(email);
      const user = await this.userModel.findOne({ email: email });
      if (!user) throw new BadRequestException('User not found.');

      const formsWithProducts = await this.formRegisterModel
        .aggregate([
          { $match: { userId: new Types.ObjectId(user._id) } },
          {
            $lookup: {
              from: 'products', // Tên collection trong MongoDB thường là số nhiều và lowercase
              localField: 'productSKUs',
              foreignField: 'sku',
              as: 'products',
            },
          },
          {
            $project: {
              name: 1,
              phoneNumber: 1,
              email: 1,
              address: 1,
              productSKUs: 1,
              isSign: 1,
              status: 1,
              shippingMethod: 1,
              trackingNumber: 1,
              estimatedDeliveryTime: 1,
              shippingCarrier: 1,
              userId: 1,
              products: 1, // Danh sách sản phẩm tương ứng
              createdAt: 1,
              updatedAt: 1,
            },
          },
        ])
        .exec();

      if (!formsWithProducts || formsWithProducts.length === 0) {
        throw new NotFoundException(
          `No forms found for user with ID ${user._id}`,
        );
      }

      return formsWithProducts;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * Get the number of users registered per product SKU.
   * @returns An array of objects containing SKU and user count.
   */
  async getUserCountPerSKU(): Promise<{ sku: string; userCount: number }[]> {
    // const result = await this.formRegisterModel.aggregate([
    //   // Unwind the productSKUs array to process each SKU individually
    //   { $unwind: '$productSKUs' },

    //   // Group by the SKU and collect unique userIds
    //   {
    //     $group: {
    //       _id: '$productSKUs',
    //       uniqueUsers: { $addToSet: '$userId' },
    //     },
    //   },

    //   // Project the desired output format
    //   {
    //     $project: {
    //       _id: 0,
    //       sku: '$_id',
    //       userCount: { $size: '$uniqueUsers' },
    //     },
    //   },

    //   // Optional: Sort the results by userCount in descending order
    //   { $sort: { userCount: -1 } },
    // ]);

    const result = await this.formRegisterModel.aggregate([
      // Unwind the productSKUs array to process each SKU individually
      { $unwind: '$productSKUs' },

      // Group by the SKU and collect unique userIds
      {
        $group: {
          _id: '$productSKUs',
          uniqueUsers: { $addToSet: '$userId' },
        },
      },

      // Lookup to join with the Product collection based on SKU
      {
        $lookup: {
          from: 'products', // The name of the Product collection
          localField: '_id', // Field from the current aggregation (SKU)
          foreignField: 'sku', // Field from the Product collection
          as: 'productDetails',
        },
      },

      // Unwind the productDetails array
      { $unwind: '$productDetails' },

      // Project the desired output format
      {
        $project: {
          _id: 0,
          sku: '$_id',
          product: '$productDetails',
          userCount: { $size: '$uniqueUsers' },
        },
      },

      // Optional: Sort the results by userCount in descending order
      { $sort: { userCount: -1 } },
    ]);

    return result;
  }

  /**
   * Get the number of sample products each user has registered for.
   * @returns An array of objects containing user details and product count.
   */
  async getProductCountPerUser(): Promise<
    { user: User; productCount: number }[]
  > {
    const aggregationResult = await this.formRegisterModel.aggregate([
      // Stage 1: Group by userId and accumulate all productSKUs arrays
      {
        $group: {
          _id: '$userId',
          productSKUs: { $push: '$productSKUs' },
        },
      },
      // Stage 2: Flatten the productSKUs arrays into a single array per user
      {
        $project: {
          userId: '$_id',
          productSKUs: {
            $reduce: {
              input: '$productSKUs',
              initialValue: [],
              in: { $concatArrays: ['$$value', '$$this'] },
            },
          },
        },
      },
      // Stage 3: Calculate the number of unique productSKUs per user
      {
        $project: {
          userId: 1,
          productCount: { $size: { $ifNull: ['$productSKUs', []] } },
        },
      },
      // Stage 4: Lookup user details from the User collection
      {
        $lookup: {
          from: 'users', // Collection name in MongoDB (usually the plural of the model name)
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
          pipeline: [
            {
              $project: {
                _id: 0, // Exclude _id from user details
                name: 1,
                phoneNumber: 1,
                email: 1,
              },
            },
          ],
        },
      },
      // Stage 5: Unwind the userDetails array
      {
        $unwind: '$userDetails',
      },
      // Stage 6: Project the desired fields
      {
        $project: {
          _id: 0,
          name: '$userDetails.name',
          phoneNumber: '$userDetails.phoneNumber',
          email: '$userDetails.email',
          productCount: 1,
        },
      },
      // Optional: Sort by productCount descending
      {
        $sort: { productCount: -1 },
      },
    ]);

    return aggregationResult;
  }
}
