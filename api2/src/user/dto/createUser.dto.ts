import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsPassportNumber,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsPhoneNumber('VN')
  readonly phoneNumber: string;

  readonly avatar: string;
  readonly dob: Date;
  readonly sex: string;
}
