import { Role, Social } from '../models/user.model';

export class UpdateUserDTO {
  name: string;
  email: string;
  password: string;
  dob: Date;
  address: string;
  sex: boolean;
  phoneNumber: string;
  verify: boolean;
  avatar: string;
  role: Role;
  tag: string;
  social: Social;
}
