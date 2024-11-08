import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      return false;
    }

    try {
      const user = await this.jwtService.verifyAsync(token);
      request['user'] = user; // Ensure `request['user']` is correctly set

      return requiredRoles.some((role) => user.roles?.includes(role)); // Updated to `user.roles`
    } catch (err) {
      return false;
    }
  }
}
