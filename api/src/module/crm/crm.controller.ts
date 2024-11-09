import {
  Controller,
  HttpException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CrmService } from './crm.service';
import { ResponseSuccess } from 'src/common/interfaces/response.interface';

@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      // Call the service to process and save the file
      await this.crmService.processAndSaveFile(file);
      return new ResponseSuccess('');
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post('get-all')
  async getAll() {
    try {
      const res = await this.crmService.getAllAffiliates();
      return new ResponseSuccess(res);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  
}
