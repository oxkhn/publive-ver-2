// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Types } from 'mongoose';

// export enum Role {
//   SUPER = 'SUPER',
//   ADMIN = 'ADMIN',
//   MOD = 'MOD',
//   KOL = 'KOL',
// }

// @Schema({
//   timestamps: true,
// })
// export class User {
//   @Prop({ type: String, required: true, unique: true })
//   email: string;

//   @Prop({ type: String, required: true })
//   password: string;

//   @Prop({ type: String })
//   name: string;

//   @Prop({ type: String })
//   phoneNumber: string;

//   @Prop({ type: [String], default: Role.KOL })
//   roles: Role[];

//   @Prop({ type: Boolean, default: true })
//   actived: boolean;

//   @Prop({ type: Boolean, default: false })
//   verifyEmail: boolean;

//   @Prop({ type: Boolean, default: false })
//   verify: boolean;
// }

// export type UserWithId = User & { _id: Types.ObjectId };

// export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class SocialLink {
  @Prop({ type: String, default: '' })
  linkUrl: string;

  @Prop({ type: Boolean, default: false })
  verify: boolean;

  @Prop({ type: String, default: '' })
  accessToken: string;
}

export class Social {
  facebook: SocialLink;
  tiktok: SocialLink;
  youtube: SocialLink;
  other: SocialLink;
  shopeeUsername: SocialLink;
  shopee: SocialLink;
  instagram: SocialLink;
}

export enum Role {
  SUPER = 'SUPER',
  ADMIN = 'ADMIN',
  MOD = 'MOD',
  KOL = 'KOL',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: Date, default: Date.now })
  dob: Date;

  @Prop({ type: Boolean, default: true })
  sex: boolean;

  @Prop({ type: String, default: '' })
  phoneNumber: string;

  @Prop({ type: Boolean, default: false })
  verify: boolean;

  @Prop({ type: String, default: '' })
  avatar: string;

  @Prop({ type: [String], default: Role.KOL })
  roles: Role[];

  @Prop({ type: [String], default: [] })
  tag: string;

  @Prop({
    type: Social,
    default: {
      facebook: { linkUrl: '', verify: false, accessToken: '' },
      tiktok: { linkUrl: '', verify: false, accessToken: '' },
      youtube: { linkUrl: '', verify: false, accessToken: '' },
      instagram: { linkUrl: '', verify: false, accessToken: '' },
      other: { linkUrl: '', verify: false, accessToken: '' },
      shopee: { linkUrl: '', verify: false, accessToken: '' },
      shopeeUsername: { linkUrl: '', verify: false, accessToken: '' },
    },
  })
  social: Social;
}

export type UserWithId = User & { _id: Types.ObjectId };

export const UserSchema = SchemaFactory.createForClass(User);
