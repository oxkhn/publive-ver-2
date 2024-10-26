import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  bu?: string;

  @IsString()
  @IsOptional()
  cat?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  shopSku?: string;

  @IsString()
  sku: string;

  @IsString()
  @IsOptional()
  productName?: string;

  @IsString()
  @IsOptional()
  productLink?: string;

  @IsNumber()
  @IsOptional()
  commission?: number;

  @IsNumber()
  @IsOptional()
  hotCash?: number;

  @IsString()
  @IsOptional()
  productGift?: string;

  @IsString()
  @IsOptional()
  productGiftLink?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  discountPrice?: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageList?: string[];

  @IsNumber()
  @IsOptional()
  availableStock?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  affiliateLink?: string;

  @IsEnum(['shopee', 'lazada', ''])
  @IsOptional()
  publisher?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsEnum(['1', '2', '3'])
  @IsOptional()
  typeShort?: string;

  @IsBoolean()
  @IsOptional()
  isNew?: boolean;

  @IsNumber()
  @IsOptional()
  registeredCount?: number;

  @IsNumber()
  @IsOptional()
  unitsSold?: number;

  @IsBoolean()
  @IsOptional()
  isAuthentic?: boolean;

  @IsNumber()
  @IsOptional()
  type?: number;
}
