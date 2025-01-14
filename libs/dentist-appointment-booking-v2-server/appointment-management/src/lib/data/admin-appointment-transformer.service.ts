import { Injectable } from '@nestjs/common';
import { AppointmentDAO, HealthReportDAO, UserDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { User } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/users';
import { TreatmentsTransformer } from './treatments-transformer.service';
import {
  Appointment,
  HealthFact,
  HealthReport
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointment-booking';

@Injectable()
export class AdminAppointmentTransformer {
  constructor(private readonly treatmentsTransformer: TreatmentsTransformer) {}

  transformAppointments(appointments: Appointment[]): AppointmentDAO[] {
    return appointments
      .map((appointment) => ({
          id: appointment.id,
          startsAt: appointment.startsAt.toISOString(),
          treatments: this.treatmentsTransformer.transform(appointment.treatments || []),
          user: this.transformUser(appointment.userId)
        })
      )
      .filter((appointment) => appointment.treatments.length > 0);
  }

  transformAppointment(appointment: Appointment): AppointmentDAO {
    return {
      id: appointment.id,
      startsAt: appointment.startsAt.toISOString(),
      treatments: this.treatmentsTransformer.transformExtended(appointment.treatments || []),
      user: this.transformUserExtended(appointment.userId),
      reports: this.transformHealthReports(appointment.healthReports || [])
    };
  }

  private transformUser(user: string | User): UserDAO | undefined {
    if (typeof user !== 'object') {
      return undefined;
    }
    return {
      name: user.firstName,
      surname: user.lastName
    };
  }

  private transformUserExtended(user: string | User): UserDAO | undefined {
    if (typeof user !== 'object') {
      return undefined;
    }
    return {
      id: user.id,
      name: user.firstName,
      surname: user.lastName,
      email: user.email
    };
  }

  private transformHealthReports(healthReports: HealthReport[]): HealthReportDAO[]{
    return healthReports.map((healthReport) => ({
      additionalValue: healthReport.additionalInfo ?? undefined,
      value: (healthReport.healthFactId as HealthFact)?.value ?? ''
    }));
  }
}
