import { Role, Social } from 'src/(share)/schemas/user.schema';

export class UpdateUserDTO {
  name: string;
  email: string;
  password: string;
  dob: Date;
  sex: boolean;
  phoneNumber: string;
  verify: boolean;
  avatar: string;
  role: Role;
  tag: string;
  social: Social;
}
