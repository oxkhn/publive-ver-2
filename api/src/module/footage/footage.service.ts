import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFootageDto } from 'src/common/dto/CreateFootage.dto';
import { Footage } from 'src/common/models/footage.model';

@Injectable()
export class FootageService {
  private readonly logger = new Logger(FootageService.name);

  constructor(
    @InjectModel(Footage.name) private readonly footageModel: Model<Footage>,
  ) {}

  async createOrUpdate(footageData: CreateFootageDto) {
    try {
      const { _id } = footageData;

      if (_id) {
        const existingFootage = await this.footageModel
          .findOne({ _id: _id })
          .exec();

        if (existingFootage) {
          return await this.footageModel.findByIdAndUpdate(_id, footageData, {
            new: true,
          });
        }
      } else {
        const newFootage = new this.footageModel(footageData);
        const res = await newFootage.save();
        return res;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
