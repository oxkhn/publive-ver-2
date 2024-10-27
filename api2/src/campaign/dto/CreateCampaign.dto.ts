import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên chiến dịch không được để trống' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Mô tả chiến dịch không được để trống' })
  description: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date) // Chuyển đổi kiểu dữ liệu từ string thành Date
  // @IsNotEmpty({ message: 'Ngày bắt đầu không được để trống' })
  startDate: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  // @IsNotEmpty({ message: 'Ngày kết thúc không được để trống' })
  endDate: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  registerStartDate: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  registerEndDate: Date;

  @IsOptional()
  hotCashBouns: number;

  @IsOptional()
  status: string;

  @IsOptional()
  productSKUs: string[];

  @IsOptional()
  banner: string;

  @IsOptional()
  registerLink: string;

  @IsOptional()
  type: number;

  @IsOptional()
  _id: string;
}
