import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/models/user.model';

@Injectable()
export class UserService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getProfile(_id: string) {
    const user = await this.userModel.findById(_id).select('-password');

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
