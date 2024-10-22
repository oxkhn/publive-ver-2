import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Partner {
  @Prop({ type: String, default: 'name' })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: 'campaignEmail', required: true })
  campaignId: string;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
PartnerSchema.index({ email: 1, campaignId: 1 }, { unique: true });
