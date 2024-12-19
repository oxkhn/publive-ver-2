import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Event {
  @Prop({
    type: String,
    required: true,
    enum: ['page_view', 'interaction', 'login', 'logout'],
  })
  event: string;

  @Prop({
    type: String,
    default: null,
  })
  page: string;

  @Prop({ type: Types.ObjectId, ref: 'user' })
  userId: Types.ObjectId;

  @Prop({
    type: Date,
    default: Date.now,
    required: true,
  })
  timestamp: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
