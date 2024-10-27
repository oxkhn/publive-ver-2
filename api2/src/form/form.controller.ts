import { Body, Controller, Post } from '@nestjs/common';
import { FormService } from './form.service';
import { BaseExceptionFilter } from '@nestjs/core';
import { CreateFormDto } from './dto/CreateForm.dto';
import { ResponseSuccess } from 'src/utils/Response';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  async addForm(@Body() createFormDto: CreateFormDto) {
    try {
      await this.formService.addForm(createFormDto);

      return new ResponseSuccess('');
    } catch (error) {
      throw new BaseExceptionFilter();
    }
  }
}
