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

  @Prop({ enum: StatusForm, default: StatusForm.Pending })
  status: string;

  @Prop({ type: String })
  shippingMethod: string;

  @Prop({ type: String, default: '' })
  trackingNumber: string;

  @Prop({ type: Date })
  estimatedDeliveryTime: Date;

  @Prop({ type: String })
  shippingCarrier: string;

  @Prop({ type: Types.ObjectId, ref: 'user' })
  userId: Types.ObjectId;
}

export const FormRegisterAffiliateSchema = SchemaFactory.createForClass(
  FormRegisterAffiliate,
);
