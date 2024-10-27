import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from 'src/common/dto/CampaignCreate.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadS3Service } from '../upload-s3/upload-s3.service';
import { GetCampaignDto } from 'src/common/dto/CampaignGetAll.dto';
import { ResponseSuccess } from 'src/common/interfaces/response.interface';
import {
  multerOptions,
  SUPPORTED_FILES_EXCEL,
} from 'src/common/utils/UploadUtils';

@Controller('campaign')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly uploadS3Service: UploadS3Service,
  ) {}

  @Post('all')
  async getAllCampaign(@Body() getAllDto: GetCampaignDto) {
    try {
      const res = await this.campaignService.getAllCampaign(getAllDto);
      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async deletaCapaign(@Param('id') id: string) {
    try {
      await this.campaignService.deleteCampaign(id);
      return new ResponseSuccess('Delete success');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/upload-performance')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async createProductFromCSV(
    @UploadedFile() file,
    @Body() body: { campaignId: string },
  ) {
    try {
      if (!file) {
        throw new HttpException(
          `Please provide correct file name with extension ${JSON.stringify(SUPPORTED_FILES_EXCEL)}`,
          400,
        );
      }

      await this.campaignService.uploadPerformance(file, body.campaignId);

      return new ResponseSuccess('File uploaded successfully');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/:id/affiliate')
  async getAffiliatePreformance(@Body() body: any, @Param('id') id: string) {
    try {
      const res = await this.campaignService.getAffiliate(id);

      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('banner'))
  async createOrUpdateCampaign(
    @Body() createCampaignDto: CreateCampaignDto,
    @UploadedFile() bannerFile: Express.Multer.File,
  ) {
    try {
      if (bannerFile) {
        const url = await this.uploadS3Service.uploadFile(
          bannerFile.originalname,
          bannerFile.buffer,
        );

        createCampaignDto.banner = url;
      }

      const res =
        await this.campaignService.createOrUpdateCampaign(createCampaignDto);
      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/:id/product')
  async getProductOfCampaign(@Param() id: string) {
    try {
      const products = await this.campaignService.getProductOfCampaign(id);
      return new ResponseSuccess(products);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async getCampaignDetail(@Param() id: string) {
    try {
      const campaign = await this.campaignService.detailCampaign(id);
      return new ResponseSuccess(campaign);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
