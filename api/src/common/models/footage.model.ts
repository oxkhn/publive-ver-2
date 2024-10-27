import { Type } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Footage {
  @Prop({ type: Types.ObjectId, ref: 'users', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, default: '' })
  title: string;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: String, default: '' })
  tags: string;

  @Prop({ type: String, required: true })
  fileUrl: string;

  @Prop({ type: String })
  thumbnailUrl: string;

  @Prop({
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: string;

  @Prop({ type: Number, default: 0 })
  views: number;

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop({ type: String, default: '' })
  bu: string;

  @Prop({ type: String, default: '' })
  cat: string;

  @Prop({ type: String, default: '' })
  brand: string;

  
}

export const FootageSchema = SchemaFactory.createForClass(Footage);
// Tạo chỉ mục để cải thiện hiệu suất truy vấn
FootageSchema.index({ userId: 1 });
FootageSchema.index({ status: 1 });
FootageSchema.index({ tags: 1 });
FootageSchema.index({ createdAt: -1 });
