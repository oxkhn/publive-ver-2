import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class MailLog {
  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  campaignId: Types.ObjectId;

  @Prop({ type: String })
  subject: string;

  @Prop({ type: Boolean })
  status: boolean;

  @Prop()
  error?: string;

  @Prop({ default: Date.now })
  sentAt: Date;

  @Prop({ type: String, default: '' })
  from: string;

  @Prop({ type: String, default: '' })
  to: string;

  @Prop({ type: String, default: '' })
  template: string;
}

export const MailLogSchema = SchemaFactory.createForClass(MailLog);
