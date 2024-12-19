import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateEventDto } from 'src/common/dto/CreateEvent.dto';
import { ResponseSuccess } from 'src/common/interfaces/response.interface';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Throttle } from '@nestjs/throttler';
import { JwtService } from '@nestjs/jwt';

@Controller('tracking')
export class TrackingController {
  constructor(
    private readonly trackingService: TrackingService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  // @Throttle({ default: { limit: 3, ttl: 60000 } })
  async postTracking(@Body() event: CreateEventDto, @Request() req) {
    try {
      let email = '';

      // Extract the Authorization header
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
          const decoded = await this.jwtService.verifyAsync(token);
          email = decoded.email || '';
        } catch (err) {
          console.warn('Invalid JWT token:', err.message);
        }
      }

      const res = await this.trackingService.postEvent(event, email);

      return new ResponseSuccess(res);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
