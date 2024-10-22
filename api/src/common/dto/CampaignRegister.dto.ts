import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  _id: string;

  @IsString()
  userId: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  productSKUs: string[];

  @IsString()
  @IsOptional()
  isReceiveEmail: string;
}
