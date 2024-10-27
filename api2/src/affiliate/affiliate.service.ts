import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Affiliate } from 'src/(share)/schemas/affiliate.schema';
import { UploadService } from 'src/upload/upload.service';
import { GetAffiliateDto } from './dto/GetAffiliate.dto';

@Injectable()
export class AffiliateService {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Affiliate.name)
    private readonly affiliateModel: Model<Affiliate>,
    private readonly uploadService: UploadService,
  ) {}

  async createFromCSV(file: Express.Multer.File) {
    try {
      const affiliates = this.uploadService.readExcelFileAffiliate(file.path);

      await this.affiliateModel.insertMany(affiliates).catch((error) => {
        console.log(error);
      });

      return;
    } catch (error) {
      this.logger.error(`Failed to upload file`, error.stack);
      throw new BadRequestException('Failed to upload file');
    }
  }

  async getAll(getAffiliateData: GetAffiliateDto) {
    const { limit, page, fb, tiktok, shopee, youtube } = getAffiliateData;

    const query: any = {};

    if (fb) {
      query.fbLink = { $ne: '' }; // Only include if fbLink is not an empty string
    }

    if (tiktok) {
      query.tiktokLink = { $ne: '' }; // Only include if tiktokLink is not an empty string
    }

    if (shopee) {
      query.shopeeLink = { $ne: '' }; // Only include if shopeeLink is not an empty string
    }

    if (youtube) {
      query.youtubeLink = { $ne: '' }; // Only include if youtubeLink is not an empty string
    }

    try {
      const totalDocuments = await this.affiliateModel.countDocuments(query);
      const totalPage = Math.ceil(totalDocuments / limit);
      const nextPage = page + 1 > totalPage ? null : page + 1;

      const affiliate = await this.affiliateModel
        .find(query)
        .sort('-ROI') // Sắp xếp theo ROI từ cao xuống thấp
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ orders: -1 }); // Sắp xếp theo ROI giảm dần

      return { affiliate, totalPage, nextPage };
    } catch (error) {
      this.logger.error(`Failed to get all products`, error.stack);
      throw new BadRequestException('Failed to get all products');
    }
  }
}
