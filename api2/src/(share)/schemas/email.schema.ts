import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class EmailLog {
  @Prop({ type: Date, default: Date.now })
  sendAt: Date;

  @Prop({ type: String, default: '' })
  logMessage: string;

  @Prop({ type: Boolean, default: false })
  status: boolean;
}

@Schema({ timestamps: true })
export class Email {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, default: '' })
  name: string;

  @Prop({ type: Boolean, default: false })
  status?: boolean;

  @Prop({ type: String, default: '' })
  note?: string;

  @Prop({ type: [EmailLog], default: [] })
  logs?: EmailLog[];

  @Prop({ type: Types.ObjectId, ref: 'Campaign' })
  campaignId: string;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
