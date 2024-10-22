// src/auth/jwt-payload.interface.ts

import { Role } from '../models/user.model';

export interface JwtPayload {
  email: string;
  sub: string;
  roles: Role[];
}
