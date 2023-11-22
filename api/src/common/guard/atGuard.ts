import { AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class atGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const global: boolean = this.reflector.getAllAndOverride('global', [
      context.getClass(),
      context.getHandler(),
    ]);
    if (global) {
      return true;
    }
    return super.canActivate(context);
  }
}
