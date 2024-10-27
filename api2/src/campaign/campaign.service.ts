import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Campaign } from 'src/(share)/schemas/campaign.schema';
import { CreateCampaignDto } from './dto/CreateCampaign.dto';
import { Email } from 'src/(share)/schemas/email.schema';
import { UploadService } from 'src/upload/upload.service';
import { MailService } from 'src/email/MailService';
import { CreateEmailDto } from './dto/CreateEmail.dto';

@Injectable()
export class CampaignService {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Campaign.name)
    private readonly campaignModel: Model<Campaign>,
    private readonly uploadService: UploadService,
    private readonly mailService: MailService,
    @InjectModel(Email.name)
    private readonly emailModel: Model<Email>,
  ) {}

  async createOrUpdateCampaign(createCampaignDto: CreateCampaignDto) {
    try {
      const { _id, ...campaignData } = createCampaignDto; // Destructure to separate the _id from the rest of the data

      let campaign;

      if (_id) {
        // If _id exists, try to find and update the campaign
        campaign = await this.campaignModel.findOneAndUpdate(
          { _id }, // Filter by _id
          { $set: campaignData }, // Update with new data
          { new: true, upsert: true }, // Return the updated document, and create if not found
        );
      } else {
        // If no _id, create a new campaign
        campaign = new this.campaignModel(campaignData);
        await campaign.save();
      }

      return campaign; // Return the updated or newly created campaign
    } catch (error) {
      throw new BadRequestException('Failed to create or update campaign');
    }
  }

  async getAll() {
    try {
      const res = await this.campaignModel.find();
      return res;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteCampaign(campaignId: string) {
    try {
      await this.campaignModel.findByIdAndDelete(campaignId);

      return;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async createEmail(file: Express.Multer.File, campaignId: string) {
    const emails = this.uploadService.readExcelFile(file.path);

    const updatedEmail = emails.map((email: any) => ({
      ...email,
      campaignId: campaignId,
    }));

    await this.emailModel
      .insertMany(updatedEmail, { ordered: false })
      .catch((err) => {
        this.logger.error(err);
      });

    return;
  }

  async getCampaignDetail(id: string) {
    const campaign = await this.campaignModel.findOne({ _id: id });
    return campaign;
  }

  async getEmailOfCampaign(id: string) {
    const emails = await this.emailModel.find({ campaignId: id });

    return emails;
  }

  async deleteEmailOfCampaign(id: string) {
    const emails = await this.emailModel.deleteMany({ campaignId: id });

    return emails;
  }

  async sendMail(id: string, emails: string[]) {
    let arrEmails = [];
    for (let i = 0; i < emails.length; i++) {
      const email = await this.emailModel.findOne({ email: emails[i] });
      arrEmails.push(email)
    }
    
    const campaign = await this.campaignModel.findOne({ _id: id });

    await this.mailService.addEmailJobs(arrEmails, campaign);
    return;
  }

  async createOneEmail(email: CreateEmailDto, campaignId: string) {
    let newEmail = new this.emailModel(email);

    newEmail['campaignId'] = campaignId;

    await newEmail.save();

    return;
  }
}
