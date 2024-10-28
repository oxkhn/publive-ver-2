import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class EmailCreateCustomDto {
  @IsString()
  @IsOptional()
  banner: string;

  @IsString()
  content: string;

  @IsString()
  name: string;
}
