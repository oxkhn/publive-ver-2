import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Campaign {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: '' })
  brandName: string;

  @Prop({ type: String, default: '' })
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

  @Prop({ type: Number, default: 1 })
  type: number;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
