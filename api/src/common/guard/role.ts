import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { typeUser } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<string[]>("role", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) {
      return true; // No roles are required, allow access
    }

    const req = context.switchToHttp().getRequest();

    return role.includes(req.user.role) || req.user.id == req.params["userId"]// Check if user's roles include any required role
  }
}
