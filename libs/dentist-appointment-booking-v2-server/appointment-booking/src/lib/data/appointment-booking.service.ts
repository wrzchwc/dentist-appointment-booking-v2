import { Injectable } from '@nestjs/common';

@Injectable()
export class AppointmentBookingService {
  bookAppointment() {
    return 'booked appointment!';
  }
}
