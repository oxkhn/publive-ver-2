// mail-log.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MailLogDocument = MailLog & Document;

@Schema({ timestamps: true })
export class MailLog {
  @Prop({ required: true })
  recipient: string; // Địa chỉ email người nhận

  @Prop({ required: true })
  subject: string; // Tiêu đề email

  @Prop({ default: 'pending' })
  status: string; // Trạng thái gửi email: pending, sent, failed

  @Prop({ default: null })
  error: string; // Thông báo lỗi (nếu có)

  @Prop({ type: Date, default: null })
  sentAt: Date; // Thời gian gửi email thành công

  @Prop({ type: String })
  campaignId: string;
}

export const MailLogSchema = SchemaFactory.createForClass(MailLog);
