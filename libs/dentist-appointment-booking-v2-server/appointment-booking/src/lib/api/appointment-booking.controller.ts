import { Controller, Post } from '@nestjs/common';
import { AppointmentBookingService } from '../data/appointment-booking.service';

@Controller('appointment-booking')
export class AppointmentBookingController {
  constructor(
    private readonly appointmentBookingService: AppointmentBookingService
  ) {}

  @Post()
  bookAppointment() {
    return this.appointmentBookingService.bookAppointment();
  }
}
