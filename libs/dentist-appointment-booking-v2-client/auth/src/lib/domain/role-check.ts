import { Role, UserProfile } from '@dentist-appointment-booking-v2/shared/auth';

export function isAdmin(profile: UserProfile | undefined): boolean {
  return !!profile?.roles?.includes(Role.ADMIN);
}
