import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FormGetAllDto {
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
}
