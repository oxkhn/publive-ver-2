import { Type } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class CampaignRegister {
  @Prop({ type: Types.ObjectId, ref: 'campaigns', required: true })
  campaignId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'users', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Boolean, default: true })
  isReceiveEmail: boolean;
}

export const CampaignRegisterSchema =
  SchemaFactory.createForClass(CampaignRegister);
