// allow you to specify which roles can access a route.
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
// export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
