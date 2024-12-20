import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { FormRegisterService } from './form-register.service';
import { CreateFormDto } from 'src/common/dto/FormCreate.dto';
import {
  PaginatedResponseSuccess,
  ResponseSuccess,
} from 'src/common/interfaces/response.interface';
import { BaseExceptionFilter } from '@nestjs/core';
import { FormGetAllDto } from 'src/common/dto/FormGetAll.dto';
import { FormRegisterAffiliate } from 'src/common/models/formRegister.model';

@Controller('form-register')
export class FormRegisterController {
  constructor(private readonly formRegisterService: FormRegisterService) {}

  @Post()
  async addForm(@Body() createFormDto: CreateFormDto) {
    try {
      await this.formRegisterService.addForm(createFormDto);

      return new ResponseSuccess('');
    } catch (error) {
      throw new BaseExceptionFilter();
    }
  }

  @Post('/get-all')
  async getAll(@Body() getAll: FormGetAllDto) {
    try {
      const { products, totalPages, nextPage, currentPage, totalItems } =
        await this.formRegisterService.getAll(getAll);

      return new PaginatedResponseSuccess<FormRegisterAffiliate>(
        products,
        HttpStatus.OK,
        'Form retrieved successfully.',
        totalPages,
        nextPage,
      );
    } catch (error) {
      throw new BaseExceptionFilter();
    }
  }

  @Get('/:id')
  async getDetail(@Param('id') id: string) {
    try {
      const form = await this.formRegisterService.getDetail(id);
      return new ResponseSuccess(form);
    } catch (error) {
      throw new BaseExceptionFilter(error.message);
    }
  }
}
