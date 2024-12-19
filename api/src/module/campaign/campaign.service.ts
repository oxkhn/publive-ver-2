import { Affiliate } from './../../common/models/affiliate.model';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ObjectId } from 'mongoose';
import { CreateCampaignDto } from 'src/common/dto/CampaignCreate.dto';
import { GetCampaignDto } from 'src/common/dto/CampaignGetAll.dto';
import { Campaign } from 'src/common/models/campaign.model';
import { readExcelFileAffiliate } from 'src/common/utils/FormatCsvUtils';
import { ProductService } from '../product/product.service';
import { Product } from 'src/common/models/product.model';
import { CampaignUpdateProductDTO } from 'src/common/dto/CampaignUpdateProduct.dto';

@Injectable()
export class CampaignService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(Campaign.name) private readonly campaignModel: Model<Campaign>,
    @InjectModel(Affiliate.name)
    private readonly affiliateModel: Model<Affiliate>,
    private readonly productService: ProductService,
  ) {}

  async createOrUpdateCampaign(createCampaignDto: CreateCampaignDto) {
    try {
      if (createCampaignDto._id != '') {
        const oldCampaign = await this.campaignModel.findById(
          new Types.ObjectId(createCampaignDto._id),
        );

        if (oldCampaign) {
          const newProductSku = [];
          if (
            createCampaignDto.productSKUs &&
            createCampaignDto.productSKUs.length > 0
          ) {
            for (let i = 0; i < createCampaignDto.productSKUs.length; i++) {
              newProductSku.push(JSON.parse(createCampaignDto.productSKUs[i]));
            }

            createCampaignDto.productSKUs = newProductSku;
          }

          const newCampaign = await this.campaignModel.findByIdAndUpdate(
            createCampaignDto._id,
            createCampaignDto,
          );

          return newCampaign;
        }
      }

      delete createCampaignDto._id;

      const newCampaign = new this.campaignModel(createCampaignDto);
      newCampaign.save();
      return newCampaign;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Create campaign fail.');
    }
  }

  async getAllCampaign(getAllDto: GetCampaignDto) {
    try {
      const { name, type } = getAllDto;
      const filter: any = {};
      if (name) {
        filter.name = { $regex: name, $options: 'i' };
      }
      if (type && type != 0) {
        filter.type = type;
      }

      const campaigns = await this.campaignModel.find(filter);
      return campaigns;
    } catch (error) {
      throw new BadRequestException('Get all campaign fail.');
    }
  }

  async deleteCampaign(id: string) {
    try {
      await this.campaignModel.findByIdAndDelete(id);
      return;
    } catch (error) {
      throw new BadRequestException('Delete campaign fail.');
    }
  }

  async detailCampaign(id: string) {
    try {
      let campaign = await this.campaignModel.findOne({
        _id: new Types.ObjectId(id),
      });
      if (!campaign) throw new BadRequestException('Cannot find campaign.');

      let sdks = campaign.productSKUs;
      const products = [];
      for (let i = 0; i < sdks.length; i++) {
        let product = (
          await this.productService.getProduct(sdks[i].sku)
        ).toObject();
        product['hc'] = sdks[i].hc;
        product['coms'] = sdks[i].coms;
        products.push(product);
      }

      // Create a plain object and assign products to it
      const campaignObject: Campaign & { products: any[] } = {
        ...campaign.toObject(),
        products,
      };

      return campaignObject;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Get campaign fail.');
    }
  }

  async uploadPerformance(file: Express.Multer.File, campaignId: string) {
    try {
      const campaign = await this.campaignModel.findById(campaignId);
      if (!campaign) throw new BadRequestException('Cannot find campaign.');

      const affiliates = readExcelFileAffiliate(file.path);

      const affiliatesWithCampaignId = affiliates.map((affiliate) => ({
        ...affiliate,
        campaignId,
      }));

      await this.affiliateModel
        .insertMany(affiliatesWithCampaignId)
        .catch((error) => {
          console.log(error);
        });

      return;
    } catch (error) {
      throw new BadRequestException('Upload performance campaign failed.');
    }
  }

  async getAffiliate(campaignId: string) {
    try {
      const campaign = await this.campaignModel.findById(campaignId);
      if (!campaign) throw new BadRequestException('Cannot find campaign.');

      const affiliates = await this.affiliateModel.find({
        campaignId: campaignId,
      });

      return affiliates;
    } catch (error) {
      throw new BadRequestException('Get Affiliate error');
    }
  }

  async getAffiliateAll() {
    try {
      const affiliates = await this.affiliateModel.find();

      return affiliates;
    } catch (error) {
      throw new BadRequestException('Get Affiliate error');
    }
  }

  async getProductOfCampaign(id: string) {
    try {
      const campaign = await this.campaignModel.findById(
        new Types.ObjectId(id),
      );
      if (!campaign) throw new BadRequestException('Cannot find campaign.');

      let sdks = campaign.productSKUs;
      const products = [];
      for (let i = 0; i < sdks.length; i++) {
        let product = (
          await this.productService.getProduct(sdks[i].sku)
        ).toObject();

        const productWithAdditionalData = {
          ...product, // Copy all properties from the original product
          hc: sdks[i].hc, // Add hc
          coms: sdks[i].coms, // Add coms
        };
        products.push(productWithAdditionalData);
      }

      return products;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Get Product error');
    }
  }

  async updateProductCampaign(
    productCampaign: CampaignUpdateProductDTO,
    campaignId: string,
  ) {
    try {
      const campaign = await this.campaignModel.findOne({
        _id: new Types.ObjectId(campaignId),
      });
      if (!campaign) throw new BadRequestException('Cannot find campaign.');

      const updatedCampaign = await this.campaignModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(campaignId),
          'productSKUs.sku': productCampaign.sku,
        },
        {
          $set: {
            'productSKUs.$[elem].hc': productCampaign.hc,
            'productSKUs.$[elem].coms': productCampaign.coms,
          },
        },
        {
          new: true,
          arrayFilters: [{ 'elem.sku': productCampaign.sku }],
        },
      );

      return productCampaign;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
