import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ type: String, default: '' })
  bu: string;

  @Prop({ type: String, default: '' })
  cat: string;

  @Prop({ type: String, default: '' })
  brand: string;

  @Prop({ type: String, default: '' })
  shopSku: string;

  @Prop({ type: String, default: '', required: true })
  sku: string;

  @Prop({ type: String, default: '' })
  productName: string;

  @Prop({ type: String, default: '' })
  productLink: string;

  @Prop({ type: Number, default: 0 })
  commission: number;

  @Prop({ type: String, default: '' })
  productGift: string;

  @Prop({ type: String, default: '' })
  productGiftLink: string;

  @Prop({ type: Number, default: 0 })
  price: number;

  @Prop({ type: Number, default: 0 })
  discountPrice: number;

  @Prop({ type: String, default: '' })
  image: string;

  @Prop({ type: [String], default: [] })
  imageList: string[];

  @Prop({ type: Number, default: 0 })
  availableStock: number;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: String, default: '' })
  affiliateLink: string;

  @Prop({ type: String, enum: ['SP', 'LZ'], default: '' })
  publisher: string;

  @Prop({ type: Date, default: Date.now() })
  startDate: Date;

  @Prop({ type: Date, default: Date.now() })
  endDate: Date;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: String, enum: ['1', '2', '3'] })
  typeShort: string;

  @Prop({ type: Boolean, default: true })
  isNew: boolean;

  @Prop({ type: Number, default: 0 })
  registeredCount: number;

  @Prop({ type: Number, default: 0 })
  unitsSold: number;

  @Prop({ type: Boolean, default: true })
  isAuthentic: boolean;

  @Prop({ type: Number, default: 1 })
  type: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ sku: 1, type: 1 }, { unique: true });
