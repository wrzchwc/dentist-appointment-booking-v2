import { Role } from './responses';

export function isAdmin(roles: Role[] | undefined): boolean {
  return !!roles?.includes(Role.ADMIN);
}
