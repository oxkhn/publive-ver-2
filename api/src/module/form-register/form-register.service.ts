import { BadRequestException, Injectable, Post, Request } from '@nestjs/common';
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
      newForm.userId = user._id.toString();
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
}
