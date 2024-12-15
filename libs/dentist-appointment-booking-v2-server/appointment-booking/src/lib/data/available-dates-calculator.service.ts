import { Injectable } from '@nestjs/common';
import { PeriodFactory } from './period-factory.service';
import { Appointment } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointments';
import { DateTime } from 'luxon';
import { END_HOUR, INTERVAL_MINUTE, START_HOUR, START_MINUTE } from '../domain/time-units';
import { Period } from '../domain/period';

@Injectable()
export class AvailableDatesCalculator {
  constructor(private readonly periodFactory: PeriodFactory ) {}

  calculateAvailableDates(
    appointments: Appointment[],
    fromISO: DateTime<true>,
    estimatedLength: number
  ): string[] {
    const unavailableTimes = this.transformPeriodsToUnavailableTimes(
      this.periodFactory.createPeriods(appointments)
    );
    const availableTimes: string[] = [];
    for (let hour = START_HOUR; hour < END_HOUR; hour++) {
      for (let minute = 0; minute < 60; minute += INTERVAL_MINUTE) {
        const next = fromISO.set({ hour, minute }).toUTC();
        const coveredTimes = this.generateCoveredTimes(next, estimatedLength)
        if (this.areTimesNotOverlapping(coveredTimes, unavailableTimes)) {
          availableTimes.push(next.toISO());
        }
      }
    }
    return availableTimes;
  }

  private areTimesNotOverlapping(coveredTimes: string[], unavailableTimes: string[]): boolean {
    return coveredTimes.every((time) => !unavailableTimes.includes(time));
  }

  private generateCoveredTimes(next: DateTime<true>, length: number): string[] {
    const coveredTimes: string[] = [];
    for (let minute = START_MINUTE; minute < length; minute += INTERVAL_MINUTE) {
      coveredTimes.push(next.plus({minute: minute}).toISO())
    }
    return coveredTimes;
  }

  private transformPeriodsToUnavailableTimes(periods: Period[]): string[] {
    return periods.flatMap((period) => {
      const dt = DateTime.fromISO(period.startsAt);
      const unavailableTimes = [];
      if (!dt.isValid) {
        return [];
      }
      const minutesAtStart = dt.minute;
      for (let offset = START_MINUTE; offset < period.length; offset += INTERVAL_MINUTE) {
        unavailableTimes.push(dt.set({ minute: minutesAtStart + offset }).toUTC().toISO());
      }
      return unavailableTimes;
    });
  }
}
