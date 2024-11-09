import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CampaignUpdateProductDTO {
  @IsString()
  sku: string;

  @IsNumber()
  hc: number;

  @IsNumber()
  coms: number;
}
