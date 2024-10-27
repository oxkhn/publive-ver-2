import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Affiliate {
  @Prop({ type: String })
  affiliateId: string;

  @Prop({ type: String })
  affiliateName: string;

  @Prop({ type: String })
  affiliateUsername: string;

  @Prop({ type: Number })
  sales: number;

  @Prop({ type: Number })
  itemSold: number;

  @Prop({ type: Number })
  orders: number;

  @Prop({ type: Number })
  clicks: number;

  @Prop({ type: Number })
  commission: number;

  @Prop({ type: String })
  ROI: string;

  @Prop({ type: Number })
  totalBuyers: number;

  @Prop({ type: Number })
  newBuyers: number;

  @Prop({ type: String, default: '' })
  fbLink: string;

  @Prop({ type: String, default: '' })
  tiktokLink: string;

  @Prop({ type: String, default: '' })
  shopeeLink: string;

  @Prop({ type: String, default: '' })
  youtubeLink: string;

  @Prop({ type: String, default: '' })
  igLink: string;
}

export const AffiliateSchema = SchemaFactory.createForClass(Affiliate);
