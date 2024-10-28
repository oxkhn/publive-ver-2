import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CRMData } from 'src/common/models/crmData.model';
import * as XLSX from 'xlsx';

@Injectable()
export class CrmService {
  constructor(
    @InjectModel(CRMData.name)
    private readonly affiliateDataModel: Model<CRMData>,
  ) {}

  async processAndSaveFile(file: Express.Multer.File) {
    try {
      // Parse the Excel file
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      // Map the data and save each row
      const affiliates = data
        .slice(0, 300)
        .map((row: any) => this.mapRowToAffiliateData(row));

      await this.affiliateDataModel.insertMany(affiliates);
    } catch (error) {
      throw new BadRequestException(
        `Failed to process and save file: ${error.message}`,
      );
    }
  }

  // Helper function to map each row from the Excel file to the schema
  private mapRowToAffiliateData(row: any): Partial<CRMData> {
    return {
      no: row['No.'] || null,
      affiliateName: row['Affliate Name'] || '',
      userName: row['User Name'] || '',
      retention: row['Retention'] || '',
      kolType: row['KOL Type'] || '',
      tickCam: row['Tick Cam (Yes/No)'] === 'Yes',
      followers: parseInt(row['Followers']) || 0,
      shopeeVideo: row['Shopee video'] === 'Yes',
      shopeeVideoLink: row['Link - Shopee video'] || '',
      shopeeLS: row['Shopee LS'] === 'Yes',
      shopeeLSLink: row['Link - Shopee LS'] || '',
      facebook: row['Facebook'] === 'Yes',
      facebookLink: row['Link - Facebook'] || '',
      tiktok: row['Tiktok'] === 'Yes',
      tiktokLink: row['Link - Tiktok'] || '',
      instagram: row['Instagram'] === 'Yes',
      instagramLink: row['Link - Instagram'] || '',
      youtube: row['Youtube'] === 'Yes',
      youtubeLink: row['Link - Youtube'] || '',
      pricePerPost: parseFloat(row['Price (Pay per post)']) || 0,
      clicks: parseInt(row['Clicks']) || 0,
      itemsSold: parseInt(row['Items Sold']) || 0,
      orders: parseInt(row['Orders']) || 0,
      gmv: parseFloat(row['GMV']) || 0,
      roi: parseFloat(row['ROI']) || 0,
      shopeeLive: row['Shopee Live'] === 'Yes',
      shopeeVideoPlatform: row['Shopee Video'] === 'Yes',
      facebookEngagement: parseInt(row['Facebook.1']) || 0,
      tiktokEngagement: parseInt(row['Tiktok.1']) || 0,
      instagramEngagement: parseInt(row['Instagram.1']) || 0,
      youtubeEngagement: parseInt(row['Youtube.1']) || 0,
      othersEngagement: parseInt(row['Others']) || 0,
      cat1: row['Cat 1'] || '',
      cat2: row['Cat 2'] || '',
      cat3: row['Cat 3'] || '',
      subCat1: row['Sub-cat 1'] || '',
      subCat2: row['Sub-cat 2'] || '',
      subCat3: row['Sub-cat 3'] || '',
      subCat4: row['Sub-cat 4'] || '',
      subCat5: row['Sub-cat 5'] || '',
      brand1: row['Brand 1'] || '',
      brand2: row['Brand 2'] || '',
      brand3: row['Brand 3'] || '',
      brand4: row['Brand 4'] || '',
      brand5: row['Brand 5'] || '',
      livestreamSession: parseInt(row['Livestream session']) || 0,
      livestreamViews: parseInt(row['Views']) || 0,
      livestreamLikes: parseInt(row['Likes']) || 0,
      livestreamComments: parseInt(row['Comments']) || 0,
      livestreamGPM: parseFloat(row['GPM']) || 0,
      videoPostCount: parseInt(row['Video Post']) || 0,
      videoViews: parseInt(row['Views.1']) || 0,
      videoLikes: parseInt(row['Likes.1']) || 0,
      videoComments: parseInt(row['Comments.1']) || 0,
      videoGPM: parseFloat(row['GPM.1']) || 0,
      femaleAudience: parseFloat(row['Female Audience gender']) || 0,
      maleAudience: parseFloat(row['Male Audience gender']) || 0,
      ageDistribution: {
        '0-12': parseFloat(row['0-12']) || 0,
        '13-17': parseFloat(row['13-17']) || 0,
        '18-22': parseFloat(row['18-22']) || 0,
        '23-32': parseFloat(row['23-32']) || 0,
        '33-42': parseFloat(row['33-42']) || 0,
        '43-52': parseFloat(row['43-52']) || 0,
        '53+': parseFloat(row['53+']) || 0,
      },
    };
  }

  async getAllAffiliates(): Promise<CRMData[]> {
    try {
      return await this.affiliateDataModel.find().exec();
    } catch (error) {
      throw new BadRequestException(
        `Failed to retrieve affiliates: ${error.message}`,
      );
    }
  }
}
