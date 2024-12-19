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

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  // @UseGuards(RolesGuard)
  async postTracking(@Body() event: CreateEventDto, @Request() req) {
    try {
      const payload = req.user;
      const email = payload ? payload.email : '';
      const res = await this.trackingService.postEvent(event, email);

      return new ResponseSuccess(res);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
