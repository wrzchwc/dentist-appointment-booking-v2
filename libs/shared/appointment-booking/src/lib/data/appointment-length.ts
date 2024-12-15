import { LengthItem } from '../domain/length-item';

export function calculateTotalAppointmentLength(items: LengthItem[]): number {
  return items.reduce((sum, { quantity, length }) => sum + quantity * length, 0);
}
