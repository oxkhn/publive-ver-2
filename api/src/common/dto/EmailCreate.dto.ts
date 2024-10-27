import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsString } from 'class-validator';

export class EmailCreateDto {
  @IsEmail()
  email: string;

  @IsString()
  campaignId: string;

  @IsString()
  name: string;
}
