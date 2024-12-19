import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class CreateFormDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên không được để trống.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống.' })
  phoneNumber: string;

  @IsEmail({}, { message: 'Email không hợp lệ.' })
  @IsNotEmpty({ message: 'Email không được để trống.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Địa chỉ không được để trống.' })
  address: string;

  @IsArray({ message: 'Product SKUs phải là một mảng.' })
  @ArrayNotEmpty({ message: 'Product SKUs không được để trống.' })
  @ArrayMinSize(1, { message: 'Phải có ít nhất một Product SKU.' })
  @IsString({ each: true, message: 'Mỗi Product SKU phải là một chuỗi.' })
  productSKUs: string[];

  @IsBoolean({ message: 'Trường isSign phải là boolean.' })
  isSign: boolean;
}
