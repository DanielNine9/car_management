import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<string[]>("role", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) {
      return true; // No roles are required, allow access
    }

    const { user } = context.switchToHttp().getRequest();
    return  role.includes(user.role)// Check if user's roles include any required role
  }
}
