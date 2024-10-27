import { LoginDTO } from './dto/login.dto';
import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, User } from 'src/(share)/schemas/user.schema';
import { CreateUserDTO } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import gender from 'gender-detection';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDTO: CreateUserDTO) {
    const user = await this.userModel.findOne({
      email: createUserDTO.email,
    });

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const newUser = new this.userModel(createUserDTO);

    const saltOrRounds = 10;
    const password = createUserDTO.password;
    const hasedPassword = await bcrypt.hash(password, saltOrRounds);

    newUser['password'] = hasedPassword;
    newUser['role'] = Role.KOL;
    newUser['sex'] = true;

    await newUser.save();

    const payload = {
      email: newUser.email,
      role: newUser.role,
      _id: newUser._id,
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    newUser['password'] = undefined;

    return {
      access_token: token,
      user: newUser,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Email or password is incorrect');
    }

    return user;
  }

  async login(LoginDTO: LoginDTO) {
    try {
      const user = await this.validateUser(LoginDTO.email, LoginDTO.password);

      const payload = {
        email: user.email,
        role: user.role,
        _id: user._id,
      };

      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });

      user['password'] = undefined;

      return {
        accessToken: token,
        user: user,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async getUser(email: string) {
    const user = await this.userModel
      .findOne({ email })
      .select('-password -__v -createdAt -updatedAt');

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async updateUser(updateUserDTO: UpdateUserDTO) {
    try {
      const updateUser = await this.userModel.findOneAndUpdate(
        { email: updateUserDTO.email },
        { $set: updateUserDTO },
        { new: true, upsert: false },
      );

      return updateUser;
    } catch (error) {
      throw new BadRequestException('');
    }
  }

  async getAllUser() {
    try {
      const users = await this.userModel.find();

      return users;
    } catch (error) {
      throw new BadRequestException('');
    }
  }
}
