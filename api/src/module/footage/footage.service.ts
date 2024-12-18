import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateFootageDto } from 'src/common/dto/CreateFootage.dto';
import { GetAllFootageDto } from 'src/common/dto/FootageGetAll.dto';
import { Footage } from 'src/common/models/footage.model';

@Injectable()
export class FootageService {
  private readonly logger = new Logger(FootageService.name);

  constructor(
    @InjectModel(Footage.name) private readonly footageModel: Model<Footage>,
  ) {}

  async createOrUpdate(footageData: CreateFootageDto) {
    try {
      console.log(footageData);
      const { _id } = footageData;

      if (_id) {
        const existingFootage = await this.footageModel
          .findOne({ _id: new Types.ObjectId(_id) })
          .exec();

        if (existingFootage) {
          return await this.footageModel.findByIdAndUpdate(
            new Types.ObjectId(_id),
            footageData,
            {
              new: true,
              upsert: true,
            },
          );
        }
      } else {
        const newFootage = new this.footageModel(footageData);
        const res = await newFootage.save();
        return res;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getDetail(_id: string) {
    try {
      const footage = await this.footageModel.findOne({ _id: _id });

      if (!footage) throw new BadRequestException('Footage not found!');

      return footage;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAll(getFootageData: GetAllFootageDto) {
    try {
      const {
        limit = 1000,
        page = 1,
        cat,
        title,
        bu,
        brand,

        sortOrder = 'asc',
      } = getFootageData;

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

      const nameSkuConditions: any[] = [];

      if (title && title.trim() !== '') {
        nameSkuConditions.push({
          productName: { $regex: title.trim(), $options: 'i' },
        });
      }

      if (nameSkuConditions.length > 0) {
        query.$or = nameSkuConditions;
      }

      const totalDocuments = await this.footageModel
        .countDocuments(query)
        .exec();
      const totalPages = Math.ceil(totalDocuments / sanitizedLimit);
      const nextPage =
        sanitizedPage + 1 > totalPages ? null : sanitizedPage + 1;

      const res = await this.footageModel
        .find(query)
        .skip((sanitizedPage - 1) * sanitizedLimit)
        .limit(sanitizedLimit)
        .lean()
        .exec();

      return {
        res,
        totalPages,
        nextPage,
        currentPage: sanitizedPage,
        totalItems: totalDocuments,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
