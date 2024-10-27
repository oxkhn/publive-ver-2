import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

export function Private() {
  return applyDecorators(UseGuards(AuthGuard));
}
