import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class MCN {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: Number })
  affiliatesUnder: number;
}
