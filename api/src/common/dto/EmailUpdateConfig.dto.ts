import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class EmailUpdateConfigDto {
  @IsString()
  name: string;

  @IsString()
  host: string;

  @IsNumber()
  port: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  templatePath: string;

  @IsString()
  bu: string;

  @IsString()
  _id: string;
}
