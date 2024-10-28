import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class EmailCustom {
  @Prop({ type: String, default: '' })
  banner: string;

  @Prop({ type: String, default: '' })
  content: string;

  @Prop({ type: [String], default: [] })
  productSDKs: string;

  @Prop({ type: String, default: '' })
  name: string;
}

export const EmailCustomSchema = SchemaFactory.createForClass(EmailCustom);
