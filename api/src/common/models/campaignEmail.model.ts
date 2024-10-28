import { Type } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class CampaignEmail {
  @Prop({ type: String, default: '' })
  name: string;

  @Prop({ type: String, default: '' })
  note: string;

  @Prop({ type: String, default: '' })
  subject: string;

  @Prop({ type: String, default: '' })
  templatePath: string;

  @Prop({ type: Types.ObjectId, ref: 'user' })
  createBy: string;

  @Prop({ type: String, default: 'smtp.gmail.com' })
  host: string;

  @Prop({ type: Number, default: 587 })
  port: number;

  @Prop({ type: Boolean, default: false })
  secure: boolean;

  @Prop({ type: String, default: 'affiliate.publive@gmail.com' })
  username: string;

  @Prop({ type: String, default: 'tibv sawa gytg nrvd' })
  password: string;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: Date, required: true })
  pushlishTime: Date;

  @Prop({ type: String, enum: ['shopee', 'lazada', ''], default: '' })
  publisher: string;

  @Prop({
    type: String,
    enum: ['edit', 'ready_to_send', 'completed', 'cancel'],
    default: 'edit',
  })
  status: string;
}

export const CampaignEmailSchema = SchemaFactory.createForClass(CampaignEmail);
export type CampaignEmailWithId = CampaignEmail & { _id: string };
