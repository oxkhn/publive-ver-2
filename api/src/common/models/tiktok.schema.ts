import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class VideoDetails {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: Number, default: 1024 })
  height: number;

  @Prop({ type: Number, default: 576 })
  width: number;

  @Prop({ type: Number, default: 21 })
  duration: number;

  @Prop({ type: String, default: '540p' })
  ratio: string;

  @Prop({ type: String, default: '' })
  cover: string;

  @Prop({ type: String, default: '' })
  originCover: string;

  @Prop({ type: String, default: '' })
  dynamicCover: string;

  @Prop({ type: String, default: '' })
  playAddr: string;

  @Prop({ type: String, default: '' })
  downloadAddr: string;

  @Prop({ type: [String], default: [] })
  shareCover: string[];

  @Prop({ type: String, default: '' })
  reflowCover: string;

  @Prop({ type: Number, default: 148812 })
  bitrate: number;

  @Prop({ type: String, default: 'normal' })
  encodedType: string;

  @Prop({ type: String, default: 'mp4' })
  format: string;

  @Prop({ type: String, default: 'normal' })
  videoQuality: string;

  @Prop({ type: String, default: '' })
  encodeUserTag: string;
}

@Schema()
export class Author {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String })
  uniqueId: string;

  @Prop({ type: String })
  nickname: string;

  @Prop({ type: String })
  avatarThumb: string;

  @Prop({ type: String })
  avatarMedium: string;

  @Prop({ type: String })
  avatarLarger: string;

  @Prop({ type: String })
  signature: string;

  @Prop({ type: Boolean })
  verified: boolean;

  @Prop({ type: String })
  secUid: string;

  @Prop({ type: Boolean })
  secret: boolean;

  @Prop({ type: Boolean })
  ftc: boolean;

  @Prop({ type: Number })
  relation: number;

  @Prop({ type: Boolean })
  openFavorite: boolean;

  @Prop({ type: Number })
  commentSetting: number;

  @Prop({ type: Number })
  duetSetting: number;

  @Prop({ type: Number })
  stitchSetting: number;

  @Prop({ type: Boolean })
  privateAccount: boolean;

  @Prop({ type: Number })
  downloadSetting: number;
}

@Schema()
export class AuthorStats {
  @Prop({ type: Number })
  followingCount: number;

  @Prop({ type: Number })
  followerCount: number;

  @Prop({ type: Number })
  heartCount: number;

  @Prop({ type: Number })
  videoCount: number;

  @Prop({ type: Number })
  diggCount: number;

  @Prop({ type: Number })
  heart: number;
}

@Schema()
export class Challenge {
  @Prop({ type: String })
  id: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  desc: string;

  @Prop({ type: String })
  profileThumb: string;

  @Prop({ type: String })
  profileMedium: string;

  @Prop({ type: String })
  profileLarger: string;

  @Prop({ type: String })
  coverThumb: string;

  @Prop({ type: String })
  coverMedium: string;

  @Prop({ type: String })
  coverLarger: string;

  @Prop({ type: Boolean })
  isCommerce: boolean;
}

@Schema()
export class DuetInfo {
  @Prop({ type: String })
  duetFromId: string;
}
@Schema()
export class Music {
  @Prop({ type: String })
  id: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  playUrl: string;

  @Prop({ type: String })
  coverThumb: string;

  @Prop({ type: String })
  coverMedium: string;

  @Prop({ type: String })
  coverLarge: string;

  @Prop({ type: String })
  authorName: string;

  @Prop({ type: Boolean })
  original: boolean;

  @Prop({ type: Number })
  duration: number;

  @Prop({ type: String })
  album: string;
}

@Schema()
export class Stats {
  @Prop({ type: Number })
  diggCount: number;

  @Prop({ type: Number })
  shareCount: number;

  @Prop({ type: Number })
  commentCount: number;

  @Prop({ type: Number })
  playCount: number;

  @Prop({ type: Number })
  collectCount: number;
}

@Schema()
export class StickersOnItem {
  @Prop({ type: Number })
  stickerType: number;

  @Prop({ type: [String] })
  stickerText: string[];
}

@Schema()
export class TextExtra {
  @Prop({ type: String })
  awemeId: string;

  @Prop({ type: Number })
  start: number;

  @Prop({ type: Number })
  end: number;

  @Prop({ type: String })
  hashtagName: string;

  @Prop({ type: String })
  hashtagId: string;

  @Prop({ type: Number })
  type: number;

  @Prop({ type: String })
  userId: string;

  @Prop({ type: Boolean })
  isCommerce: boolean;

  @Prop({ type: String })
  userUniqueId: string;

  @Prop({ type: String })
  secUid: string;

  @Prop({ type: Number })
  subType: number;
}

@Schema()
export class Video {
  @Prop({ type: String })
  id: string;

  @Prop({ type: Number })
  height: number;

  @Prop({ type: Number })
  width: number;

  @Prop({ type: Number })
  duration: number;

  @Prop({ type: String })
  ratio: string;

  @Prop({ type: String })
  cover: string;

  @Prop({ type: String })
  originCover: string;

  @Prop({ type: String })
  dynamicCover: string;

  @Prop({ type: String })
  playAddr: string;

  @Prop({ type: String })
  downloadAddr: string;

  @Prop({ type: [String] })
  shareCover: string[];

  @Prop({ type: String })
  reflowCover: string;

  @Prop({ type: Number })
  bitrate: number;

  @Prop({ type: String })
  encodedType: string;

  @Prop({ type: String })
  format: string;

  @Prop({ type: String })
  videoQuality: string;

  @Prop({ type: String })
  encodeUserTag: string;
}

@Schema()
export class VideoTiktok {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: String })
  desc: string;

  @Prop({ type: Number })
  createTime: number;

  @Prop({ type: Object })
  video: Video;

  @Prop({ type: Object })
  author: Author;

  @Prop({ type: Object })
  music: Music;

  @Prop({ type: [Object] })
  challenges: Challenge[];

  @Prop({ type: Object })
  stats: Stats;

  @Prop({ type: Object })
  duetInfo: DuetInfo;

  @Prop({ type: Boolean })
  originalItem: boolean;

  @Prop({ type: Boolean })
  officalItem: boolean;

  @Prop({ type: [Object] })
  textExtra: TextExtra[];

  @Prop({ type: Boolean })
  secret: boolean;

  @Prop({ type: Boolean })
  forFriend: boolean;

  @Prop({ type: Boolean })
  digged: boolean;

  @Prop({ type: Number })
  itemCommentStatus: number;

  @Prop({ type: Boolean })
  showNotPass: boolean;

  @Prop({ type: Boolean })
  vl1: boolean;

  @Prop({ type: Boolean })
  itemMute: boolean;

  @Prop({ type: Object })
  authorStats: AuthorStats;

  @Prop({ type: Boolean })
  privateItem: boolean;

  @Prop({ type: Boolean })
  duetEnabled: boolean;

  @Prop({ type: Boolean })
  stitchEnabled: boolean;

  @Prop({ type: Boolean })
  shareEnabled: boolean;

  @Prop({ type: [Object] })
  stickersOnItem: StickersOnItem[];

  @Prop({ type: Boolean })
  isAd: boolean;

  @Prop({ type: Boolean })
  collected: boolean;
}

export type VideoTiktokDocument = VideoTiktok & Document;
export const VideoTiktokSchema = SchemaFactory.createForClass(VideoTiktok);
