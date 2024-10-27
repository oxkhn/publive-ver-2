import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Event extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({
    type: String,
    enum: ['active', 'inactive', 'completed'],
    default: 'inactive',
  })
  status: string;

  @Prop({ type: [String], default: [] })
  productSKUs: string[];

  @Prop({ type: String })
  banner: string;

  @Prop({ type: String, default: '' })
  registerLink: string;

  @Prop({ type: Date, required: true })
  registerStartDate: Date;

  @Prop({ type: Date, required: true })
  registerEndDate: Date;

  @Prop({ type: Number, default: 0 })
  hotCashBouns: number;

  @Prop({ type: Number, default: 1 })
  type: number;
}

export type EventWithId = Event & { _id: string };

export const EventSchema = SchemaFactory.createForClass(Event);
