import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

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
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: [String], default: Role.KOL })
  roles: Role[];

  @Prop({ type: Boolean, default: true })
  actived: boolean;

  @Prop({ type: Boolean, default: false })
  verifyEmail: boolean;

  @Prop({ type: Boolean, default: false })
  verify: boolean;
}

export type UserWithId = User & { _id: Types.ObjectId };

export const UserSchema = SchemaFactory.createForClass(User);
