import { IsEmail, IsString } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;
}
