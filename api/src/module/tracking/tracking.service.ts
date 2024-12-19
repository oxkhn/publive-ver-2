import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from 'src/common/dto/CreateEvent.dto';
import { Event } from 'src/common/models/event.model';
import { User } from 'src/common/models/user.model';

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel(User.name) private readonly usertModel: Model<User>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async postEvent(event: CreateEventDto, email: string) {
    try {
      const user = await this.usertModel.findOne({ email: email });
      if (!user) throw new BadRequestException('User not found.');

      user.lastActive = new Date(Date.now());
      await user.save();

      const newEvent = new this.eventModel(event);
      newEvent.userId = user._id;

      await newEvent.save();

      return newEvent;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}