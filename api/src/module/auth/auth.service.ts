import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateDto } from 'src/common/dto/UserCreate.dto';
import { User, UserWithId } from 'src/common/models/user.model';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from 'src/common/dto/UserLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { UpdateUserDTO } from 'src/common/dto/UpdateUser.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(userCreateDto: UserCreateDto) {
    const existingUser = await this.userModel.findOne({
      email: userCreateDto.email,
    });

    if (existingUser) {
      throw new BadGatewayException('User already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      userCreateDto.password,
      saltRounds,
    );

    const newUser = new this.userModel(userCreateDto);
    newUser.password = hashedPassword;
    await newUser.save();

    return newUser;
  }

  async login(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const payload: JwtPayload = {
      email,
      sub: user._id.toString(),
      roles: user.roles,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      user: user,
    };
  }

  async validateUser(userId: number): Promise<any> {
    const user = await this.userModel.findById(userId);
    if (user) {
      return { userId: user._id, email: user.email };
    }
    return null;
  }

  async getProfile(email: string): Promise<any> {
    try {
      const user = await this.userModel
        .findOne({ email })
        .select('-password -__v -createdAt -updatedAt');

      if (!user) {
        throw new BadRequestException('User not found');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
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
      const res = await this.userModel.find().select('-password');

      return res;
    } catch (error) {
      throw new BadRequestException('');
    }
  }
}
