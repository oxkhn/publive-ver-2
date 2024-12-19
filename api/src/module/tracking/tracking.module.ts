import { Module } from '@nestjs/common';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/common/models/user.model';
import { Event, EventSchema } from 'src/common/models/event.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class TrackingModule {}
