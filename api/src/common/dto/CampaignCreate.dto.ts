import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCampaignDto {
  @IsOptional()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  brandName: string;

  @IsString()
  @IsOptional()
  description: string;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsEnum(['active', 'inactive', 'completed'])
  @IsOptional()
  status: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  productSKUs: any[];

  @IsString()
  @IsOptional()
  banner: string;

  @IsString()
  @IsOptional()
  registerLink: string;

  @Type(() => Date)
  @IsDate()
  registerStartDate: Date;

  @Type(() => Date)
  @IsDate()
  registerEndDate: Date;

  @IsOptional()
  type: number;

  @IsString()
  @IsOptional()
  tags: string;

  @IsString()
  @IsOptional()
  bu?: string;

  @IsString()
  @IsOptional()
  cat?: string;

  @IsString()
  @IsOptional()
  brand?: string;
}
