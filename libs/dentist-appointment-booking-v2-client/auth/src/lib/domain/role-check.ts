import { Group, UserProfile } from '@dentist-appointment-booking-v2/shared/auth';

export function isAdmin(profile: UserProfile | undefined): boolean {
  return !!profile?.groups?.includes(Group.ADMIN);
}
