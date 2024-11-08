// src/auth/jwt-payload.interface.ts

import { Role, User } from '../models/user.model';

export interface JwtPayload {
  email: string;
  sub: string;
  roles: Role[];
}
