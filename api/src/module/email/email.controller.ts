import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { ResponseSuccess } from 'src/common/interfaces/response.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  multerOptions,
  SUPPORTED_FILES_EXCEL,
} from 'src/common/utils/UploadUtils';
import { EmailCreateDto } from 'src/common/dto/EmailCreate.dto';
import { EmailGetAllDto } from 'src/common/dto/EmailGetAll.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { EmailUpdateConfigDto } from 'src/common/dto/EmailUpdateConfig.dto';
import { EmailCampaignCreate } from 'src/common/dto/EmailCampaignCreate';
import { EmailCreateCustomDto } from 'src/common/dto/EmailCreateCustom.dto';
import { UploadS3Service } from '../upload-s3/upload-s3.service';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly uploadS3Service: UploadS3Service,
  ) {}

  @Post('create/csv/:id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async createProductFromCSV(@UploadedFile() file, @Param('id') id: string) {
    try {
      if (!file) {
        throw new HttpException(
          `Please provide correct file name with extension ${JSON.stringify(SUPPORTED_FILES_EXCEL)}`,
          400,
        );
      }

      await this.emailService.createEmailFromFile(file, id);

      return new ResponseSuccess('File uploaded successfully');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('campaign')
  async createOrUpdateCampaign(@Body() body: EmailCampaignCreate) {
    try {
      const res = await this.emailService.createOrUpdateCampaign(body);
      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('all')
  async getAllCampaign(@Body() body: any) {
    try {
      const camapaigns = await this.emailService.getCampaigns();
      return new ResponseSuccess(camapaigns);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('mail-log/:campaignId')
  async getMailLog(@Param('campaignId') campaignId: string) {
    try {
      const res = await this.emailService.getMailLog(campaignId);
      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('template')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/common/template',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @Delete('campaign/:id')
  async deleteCampaign(@Param('id') id: string) {
    try {
      await this.emailService.deleteCampaign(id);
      return new ResponseSuccess('Delete success.');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async deleteEmail(@Param('id') id: string) {
    try {
      await this.emailService.deleteEmail(id);
      return new ResponseSuccess('Delete success.');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/create-email')
  async createEmail(@Body() body: EmailCreateDto) {
    try {
      const res = await this.emailService.createEmail(body);
      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/create-email-custom')
  @UseInterceptors(FileInterceptor('banner'))
  async createEmailCustom(
    @Body() body: EmailCreateCustomDto,
    @UploadedFile() bannerFile: Express.Multer.File,
  ) {
    try {
      if (bannerFile) {
        const url = await this.uploadS3Service.uploadFile(
          bannerFile.originalname,
          bannerFile.buffer,
        );
        console.log(url);

        body.banner = url;
      }

      const res = await this.emailService.createEmailTemplateCustom(body);
      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/campaign/:id')
  async getCampaign(@Param('id') id: string) {
    try {
      const res = await this.emailService.getCampaign(id);
      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post(':id/all-email/')
  async getAllEmail(@Body() body: EmailGetAllDto, @Param('id') id: string) {
    try {
      const emails = await this.emailService.getEmails(body, id);
      return new ResponseSuccess(emails);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async uploadTemplate(@UploadedFile() file: Express.Multer.File) {
    try {
      return new ResponseSuccess('Success');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/template/:filename')
  async getTemplateContent(@Param('filename') filename: string) {
    try {
      console.log(filename);
      const template = this.emailService.getTemplateContent(filename);
      return new ResponseSuccess(template);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('templates')
  getTemplateFiles() {
    try {
      const res = this.emailService.getTemplateFiles();
      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('config')
  async updateConfig(@Body() config: EmailUpdateConfigDto) {
    try {
      const res = this.emailService.updateConfig(config);
      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post(':id/send-mail')
  async sendMail(@Body() body: any, @Param('id') id: string) {
    try {
      const res = await this.emailService.sendMail(body, id);
      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
