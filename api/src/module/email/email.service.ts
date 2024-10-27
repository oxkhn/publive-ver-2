import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { EmailCreateDto } from 'src/common/dto/EmailCreate.dto';
import { EmailGetAllDto } from 'src/common/dto/EmailGetAll.dto';
import { CampaignEmail } from 'src/common/models/campaignEmail.model';
import { Partner } from 'src/common/models/partner.model';
import { readExcelFile } from 'src/common/utils/FormatCsvUtils';
import { readdirSync } from 'fs';
import { join } from 'path';
import { EmailUpdateConfigDto } from 'src/common/dto/EmailUpdateConfig.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { EmailCampaignCreate } from 'src/common/dto/EmailCampaignCreate';
import { readFileSync } from 'fs';

@Injectable()
export class EmailService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(CampaignEmail.name)
    private readonly campaignEmailModel: Model<CampaignEmail>,
    @InjectModel(Partner.name)
    private readonly partnerModel: Model<Partner>,
    @InjectQueue('emailQueue') private readonly emailQueue: Queue,
  ) {}

  async createOrUpdateCampaign(campaign: EmailCampaignCreate) {
    try {
      let data = campaign;

      if (campaign._id && campaign._id != '') {
        delete data['_id'];
        const oldCampaign = await this.campaignEmailModel.findOneAndUpdate(
          { _id: campaign._id },
          data,
          { new: true },
        );

        return oldCampaign;
      }

      delete data['_id'];
      delete data['host'];
      delete data['port'];
      delete data['username'];
      delete data['password'];

      const newCampaign = new this.campaignEmailModel(campaign);
      newCampaign.save();
      return newCampaign;
    } catch (error) {
      throw new BadRequestException('Create campaign fail.');
    }
  }

  async getCampaigns() {
    try {
      const camapaigns = await this.campaignEmailModel.find();
      return camapaigns;
    } catch (error) {
      throw new BadRequestException('Get all campaign fail.');
    }
  }

  async getEmails(body: EmailGetAllDto, id: string) {
    try {
      const { name, email } = body;
      const query: any = {};

      const nameSkuConditions: any[] = [];

      if (name && name.trim() !== '') {
        nameSkuConditions.push({
          name: { $regex: name.trim(), $options: 'i' },
        });
      }

      if (email && email.trim() !== '') {
        nameSkuConditions.push({
          email: { $regex: email.trim(), $options: 'i' },
        });
      }

      if (nameSkuConditions.length > 0) {
        query.$or = nameSkuConditions;
      }

      if (id) {
        query.campaignId = id;
      }

      const emails = await this.partnerModel.find(query);
      return emails;
    } catch (error) {
      throw new BadRequestException('Get all campaign fail.');
    }
  }

  async deleteCampaign(id: string) {
    try {
      await this.campaignEmailModel.findByIdAndDelete(new Types.ObjectId(id));
      return;
    } catch (error) {
      throw new BadRequestException('Delete campaign fail.');
    }
  }

  async deleteEmail(id: string) {
    try {
      await this.partnerModel.findByIdAndDelete(new Types.ObjectId(id));
      return;
    } catch (error) {
      throw new BadRequestException('Delete email fail.');
    }
  }

  async createEmailFromFile(file, id: string) {
    try {
      const campaign = await this.campaignEmailModel.findById(
        new Types.ObjectId(id),
      );
      if (!campaign) throw new BadRequestException('Cannot find campaign.');

      const processData = readExcelFile(file.path);

      for (let i = 0; i < processData.length; i++) {
        let data = processData[i];
        data['campaignId'] = id;

        const newPartner = new this.partnerModel(data);
        try {
          await newPartner.save();
        } catch (error) {
          this.logger.error(error.message);
          continue;
        }
      }

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createEmail(email: EmailCreateDto) {
    try {
      const newEmail = new this.partnerModel(email);
      await newEmail.save();

      return newEmail;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCampaign(id: string) {
    try {
      const campaign = await this.campaignEmailModel.findById(
        new Types.ObjectId(id),
      );
      return campaign;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  getTemplateFiles() {
    try {
      const templateDir = join(__dirname, '../src/common/template');
      const files = readdirSync(templateDir);

      return files.map((file) => ({
        filename: file,
        path: file,
      }));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  getTemplateContent(filename: string) {
    try {
      console.log(filename);
      const templateDir = join(__dirname, '../src/common/template');
      const filePath = join(templateDir, filename);

      // Read the file content as a string
      const content = readFileSync(filePath, 'utf-8');

      return {
        filename,
        content, // HTML content of the template
      };
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException(`Template file not found: ${filename}`);
      }
      throw new BadRequestException(`Error reading template: ${error.message}`);
    }
  }

  async updateConfig(config: EmailUpdateConfigDto) {
    try {
      const campaign = await this.campaignEmailModel.findOne({
        _id: config._id,
      });

      if (!campaign) throw new BadRequestException('Cannot find campaign.');

      const newCampaign = await this.campaignEmailModel.findOneAndUpdate(
        { _id: config._id },
        config,
      );
      return newCampaign;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async sendMail(emails: string[], campaignId: string) {
    try {
      const campaign = await this.campaignEmailModel.findOne({
        _id: campaignId,
      });

      if (!campaign) throw new BadRequestException('Cannot find campaign.');

      for (let i = 0; i < emails.length; i++) {
        const email = emails[i];
        await this.emailQueue.add('sendEmailJob', {
          email,
          campaign,
        });
        this.logger.log(`Add ${email} to Job success.`);
      }

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
