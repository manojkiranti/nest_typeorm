import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user: JwtPayload = request.user; // The user should already be populated in the request

    if (user && user.roles && user.roles.includes('admin')) {
      return true;
    }

    return false;
  }
}
