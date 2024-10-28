import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CRMData extends Document {
  @Prop({ type: Number })
  no: number;

  @Prop({ type: String })
  affiliateName: string;

  @Prop({ type: String })
  userName: string;

  @Prop({ type: String })
  retention: string;

  @Prop({ type: String })
  kolType: string;

  @Prop({ type: Boolean })
  tickCam: boolean;

  @Prop({ type: Number })
  followers: number;

  @Prop({ type: Boolean })
  shopeeVideo: boolean;

  @Prop({ type: String })
  shopeeVideoLink: string;

  @Prop({ type: Boolean })
  shopeeLS: boolean;

  @Prop({ type: String })
  shopeeLSLink: string;

  @Prop({ type: Boolean })
  facebook: boolean;

  @Prop({ type: String })
  facebookLink: string;

  @Prop({ type: Boolean })
  tiktok: boolean;

  @Prop({ type: String })
  tiktokLink: string;

  @Prop({ type: Boolean })
  instagram: boolean;

  @Prop({ type: String })
  instagramLink: string;

  @Prop({ type: Boolean })
  youtube: boolean;

  @Prop({ type: String })
  youtubeLink: string;

  @Prop({ type: Number })
  pricePerPost: number;

  @Prop({ type: Number })
  clicks: number;

  @Prop({ type: Number })
  itemsSold: number;

  @Prop({ type: Number })
  orders: number;

  @Prop({ type: Number })
  gmv: number;

  @Prop({ type: Number })
  roi: number;

  @Prop({ type: Boolean })
  shopeeLive: boolean;

  @Prop({ type: Boolean })
  shopeeVideoPlatform: boolean;

  // Platform-specific engagement metrics
  @Prop({ type: Number })
  facebookEngagement: number;

  @Prop({ type: Number })
  tiktokEngagement: number;

  @Prop({ type: Number })
  instagramEngagement: number;

  @Prop({ type: Number })
  youtubeEngagement: number;

  @Prop({ type: Number })
  othersEngagement: number;

  // Categories and sub-categories
  @Prop({ type: String })
  cat1: string;

  @Prop({ type: String })
  cat2: string;

  @Prop({ type: String })
  cat3: string;

  @Prop({ type: String })
  subCat1: string;

  @Prop({ type: String })
  subCat2: string;

  @Prop({ type: String })
  subCat3: string;

  @Prop({ type: String })
  subCat4: string;

  @Prop({ type: String })
  subCat5: string;

  @Prop({ type: String })
  brand1: string;

  @Prop({ type: String })
  brand2: string;

  @Prop({ type: String })
  brand3: string;

  @Prop({ type: String })
  brand4: string;

  @Prop({ type: String })
  brand5: string;

  // Livestream and video engagement metrics
  @Prop({ type: Number })
  livestreamSession: number;

  @Prop({ type: Number })
  livestreamViews: number;

  @Prop({ type: Number })
  livestreamLikes: number;

  @Prop({ type: Number })
  livestreamComments: number;

  @Prop({ type: Number })
  livestreamGPM: number;

  @Prop({ type: Number })
  videoPostCount: number;

  @Prop({ type: Number })
  videoViews: number;

  @Prop({ type: Number })
  videoLikes: number;

  @Prop({ type: Number })
  videoComments: number;

  @Prop({ type: Number })
  videoGPM: number;

  // Audience demographics
  @Prop({ type: Number })
  femaleAudience: number;

  @Prop({ type: Number })
  maleAudience: number;

  @Prop({ type: Map, of: Number })
  ageDistribution: {
    '0-12': number;
    '13-17': number;
    '18-22': number;
    '23-32': number;
    '33-42': number;
    '43-52': number;
    '53+': number;
  };
}

export const CRMDataSchema = SchemaFactory.createForClass(CRMData);
