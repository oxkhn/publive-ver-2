import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/CreateForm.dto';
import { FormRegisterAffiliate } from 'src/(share)/schemas/form.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FormService {
  constructor(
    @InjectModel(FormRegisterAffiliate.name)
    private readonly productModel: Model<FormRegisterAffiliate>,
  ) {}

  async addForm(createFormDto: CreateFormDto) {
    try {
      const newForm = new this.productModel(createFormDto);

      await newForm.save();
    } catch (error) {
      throw new BadRequestException('');
    }
  }
}
