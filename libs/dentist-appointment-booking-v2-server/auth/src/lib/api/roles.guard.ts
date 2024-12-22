import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@dentist-appointment-booking-v2/shared/auth';
import { ROLES_KEY } from './roles.decorator';
import { AuthenticatedRequest } from '../domain/authenticated-request';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { roles } = context.switchToHttp().getRequest<AuthenticatedRequest>();
    return requiredRoles.some((role) => roles?.includes(role));
  }
}
