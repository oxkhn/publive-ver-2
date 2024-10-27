import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { ResponseSuccess } from 'src/utils/Response';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from 'src/(share)/guards/auth.guard';
import { Private } from 'src/(share)/guards/customize.decorator.guard';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDTO: CreateUserDTO) {
    const resData = await this.userService.create(createUserDTO);

    return new ResponseSuccess(resData);
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    try {
      const resData = await this.userService.login(loginDTO);

      return new ResponseSuccess(resData);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get('profile')
  @Private()
  async profile(@Request() req) {
    const payload = req.user;
    const user = await this.userService.getUser(payload.email);
    return new ResponseSuccess(user);
  }

  @Put()
  async updateProfile(@Body() updateUserDTO: UpdateUserDTO) {
    try {
      const resData = await this.userService.updateUser(updateUserDTO);

      return new ResponseSuccess(resData);
    } catch (error) {
      throw new BadRequestException('');
    }
  }

  @Get()
  async getAllUser() {
    try {
      const res = await this.userService.getAllUser();

      return new ResponseSuccess(res);
    } catch (error) {
      throw new BadRequestException('Error');
    }
  }
}
