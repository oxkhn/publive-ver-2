import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/models/user.model';
import { UserService } from './user.service';
import { ResponseSuccess } from 'src/common/interfaces/response.interface';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.KOL)
  @Get()
  async getProfile() {
    return new ResponseSuccess('Get Profile');
  }
}
