import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export enum StatusForm {
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
  'Failed',
  'Cancelled',
  'Returned',
}

@Schema({
  timestamps: true,
})
export class FormRegisterAffiliate {
  @Prop({ type: String, default: '' })
  name: string;

  @Prop({ type: String, default: '' })
  phone: string;

  @Prop({ type: String, default: '' })
  email: string;

  @Prop({ type: String, default: '' })
  shopeeAffiliateAccount: string;

  @Prop({ type: String, default: '' })
  facebookLink: string;

  @Prop({ type: String, default: '' })
  instargramLink: string;

  @Prop({ type: String, default: '' })
  threadsLink: string;

  @Prop({ type: String, default: '' })
  tiktokLink: string;

  @Prop({ type: String, default: '' })
  youtubeLink: string;

  @Prop({ type: String, default: '' })
  websiteLink: string;

  @Prop({ type: String, default: '' })
  shopeeLiveLink: string;

  @Prop({ type: String, default: '' })
  shopeeVideoLink: string;

  @Prop({ type: String, default: '' })
  address: string;

  @Prop({ type: String, default: '' })
  receivePhoneNumber: string;

  @Prop({ type: String, default: '' })
  receiveName: string;

  @Prop({ type: [String] })
  productSKUs: string[];

  @Prop({ enum: StatusForm })
  status: string;

  @Prop({ type: String })
  shippingMethod: string;

  @Prop({ type: String })
  trackingNumber: string;

  @Prop({ type: Date })
  estimatedDeliveryTime: Date;

  @Prop({ type: String })
  shippingCarrier: string;

  @Prop({ type: Types.ObjectId, ref: 'user' })
  userId: string;
}

export const FormRegisterAffiliateSchema = SchemaFactory.createForClass(
  FormRegisterAffiliate,
);
