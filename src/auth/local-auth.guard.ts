import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { Request } from 'express';

interface CustomRequest extends Request {
  user?: any;
}

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const { username, password } = request.body;

    if (!username || !password) {
      return false;
    }

    const user = await this.authService.validateUser(username, password);
    if (user) {
      request.user = user;
      return true;
    }
    return false;
  }
}
