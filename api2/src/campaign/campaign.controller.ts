import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/CreateCampaign.dto';
import { multerOptions } from 'src/utils/Upload';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadS3Service } from 'src/upload-s3/upload-s3.service';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse } from 'src/utils/ApiResponse';
import { ResponseSuccess } from 'src/utils/Response';
import { CreateEmailDto } from './dto/CreateEmail.dto';

@Controller('campaign')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly uploadS3Service: UploadS3Service,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('banner'))
  async createCampaign(
    @UploadedFile() banner: Express.Multer.File,
    @Body() createCampaignDto: CreateCampaignDto,
  ) {
    try {
      if (banner) {
        const url = await this.uploadS3Service.uploadFile(
          banner.originalname,
          banner.buffer,
        );

        createCampaignDto.banner = url;
      }

      await this.campaignService.createOrUpdateCampaign(createCampaignDto);

      return new ApiResponse('');
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @Get()
  async getAllCampaign() {
    try {
      const res = await this.campaignService.getAll();

      return new ApiResponse(res);
    } catch (error) {
      throw new BadRequestException('');
    }
  }

  @Delete('/email/:id')
  async deleteCampaignEmail(@Param('id') id: string) {
    try {
      console.log(id);
      await this.campaignService.deleteEmailOfCampaign(id);

      return new ApiResponse('');
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Delete('/:id')
  async deleteCampaign(@Param('id') id: string) {
    try {
      await this.campaignService.deleteCampaign(id);

      return new ApiResponse('');
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get('/:id')
  async getCampaignDetail(@Param('id') id: string) {
    try {
      const campaign = await this.campaignService.getCampaignDetail(id);
      return new ResponseSuccess(campaign);
    } catch (error) {
      throw new BadRequestException('');
    }
  }

  @Post('/email/one/:id')
  async createOneEmail(
    @Body() emailDto: CreateEmailDto,
    @Param('id') id: string,
  ) {
    try {
      console.log(emailDto);
      await this.campaignService.createOneEmail(emailDto, id);

      return new ResponseSuccess('');
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('/email/:id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async createEmail(@UploadedFile() file, @Param('id') id: string) {
    try {
      await this.campaignService.createEmail(file, id);

      return new ResponseSuccess('');
    } catch (error) {
      throw new BadRequestException('');
    }
  }

  @Get('/email/:id')
  async getEmailOfCampaign(@Param('id') id: string) {
    try {
      const emails = await this.campaignService.getEmailOfCampaign(id);
      return new ResponseSuccess(emails);
    } catch (error) {
      throw new BadRequestException('');
    }
  }

  @Post('email/send/:id')
  async sendMail(@Param('id') id: string, @Body() emails: string[]) {
    try {
      this.campaignService.sendMail(id, emails);
      return new ResponseSuccess('');
    } catch (error) {
      throw new BadRequestException('');
    }
  }
}
