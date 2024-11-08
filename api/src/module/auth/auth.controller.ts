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
import { UserCreateDto } from 'src/common/dto/UserCreate.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from 'src/common/dto/UserLogin.dto';
import { ResponseSuccess } from 'src/common/interfaces/response.interface';
import { UpdateUserDTO } from 'src/common/dto/UpdateUser.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() userCreateDto: UserCreateDto) {
    try {
      const res = await this.authService.register(userCreateDto);
      return new ResponseSuccess(res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto) {
    try {
      const res = await this.authService.login(userLoginDto);
      return new ResponseSuccess(res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/profile')
  @UseGuards(RolesGuard)
  async getProFile(@Request() req) {
    try {
      const payload = req.user;
      const res = await this.authService.getProfile(payload.email);
      return new ResponseSuccess(res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put()
  async updateProfile(@Body() updateUserDTO: UpdateUserDTO) {
    try {
      const resData = await this.authService.updateUser(updateUserDTO);

      return new ResponseSuccess(resData);
    } catch (error) {
      throw new BadRequestException('');
    }
  }
}
