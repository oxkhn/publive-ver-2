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
  phoneNumber: string;

  @Prop({ type: String, default: '' })
  email: string;

  @Prop({ type: String, default: '' })
  address: string;

  @Prop({ type: [String] })
  productSKUs: string[];

  @Prop({ type: Boolean })
  isSign: boolean;

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
