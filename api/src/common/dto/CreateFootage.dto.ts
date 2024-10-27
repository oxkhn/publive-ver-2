import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateFootageDto {
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsNotEmpty()
  fileUrl: string;

  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @IsEnum(['pending', 'approved', 'rejected'])
  @IsOptional()
  status?: string;

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
  _id: string;
}
