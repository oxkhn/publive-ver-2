import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EmailGetAllDto {
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  name: string;
}
