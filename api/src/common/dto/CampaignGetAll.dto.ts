import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class GetCampaignDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  type?: number;

  @IsOptional()
  @IsString()
  sortBy?: string;
}
