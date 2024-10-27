import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Partner {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: Number })
  affiliatesUnder: number;
}
