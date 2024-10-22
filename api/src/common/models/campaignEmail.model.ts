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
}

export const CampaignEmailSchema = SchemaFactory.createForClass(CampaignEmail);
