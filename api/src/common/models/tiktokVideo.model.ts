import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class TiktokVideo {
  @Prop({ type: String, default: '' })
  videoId: string;

  @Prop({ type: String, default: '' })
  title: string;

  @Prop({ type: Number, default: 0 })
  createTime: number;

  @Prop({ type: Number, default: 0 })
  duration: number;

  @Prop({ type: String, default: '' })
  ratio: string;

  @Prop({ type: String, default: '' })
  image: string;

  @Prop({ type: String, default: '' })
  authorId: string;

  @Prop({ type: String, default: '' })
  uniqueId: string;

  @Prop({ type: String, default: '' })
  nickname: string;

  @Prop({ type: String, default: '' })
  avatarThumb: string;

  @Prop({ type: String, default: '' })
  signature: string;

  @Prop({ type: String, default: '' })
  musicId: string;

  @Prop({ type: Number, default: 0 })
  diggCount: number;

  @Prop({ type: Number, default: 0 })
  shareCount: number;

  @Prop({ type: Number, default: 0 })
  commentCount: number;

  @Prop({ type: Number, default: 0 })
  playCount: number;

  @Prop({ type: Number, default: 0 })
  collectCount: number;

  @Prop({ type: Number, default: 0 })
  followingCount: number;

  @Prop({ type: Number, default: 0 })
  followerCount: number;

  @Prop({ type: Number, default: 0 })
  heartCount: number;

  @Prop({ type: Number, default: 0 })
  videoCount: number;
}

export type TiktokVideoDocument = TiktokVideo & Document;
export const TiktokVideoSchema = SchemaFactory.createForClass(TiktokVideo);
