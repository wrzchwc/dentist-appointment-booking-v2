import { EntitySchema } from 'typeorm';
import { Appointment } from './appointment.model';

export const AppointmentEntity = new EntitySchema<Appointment>({
  name: 'appointments',
  columns: {
    id: {
      type: 'uuid',
      generated: 'uuid',
      primary: true
    },
    startsAt: {
      type: Date
    }
  },
  relations: {
    userId: {
      type: 'many-to-one',
      target: 'users',
      joinColumn: {
        name: 'userId',
        referencedColumnName: 'id'
      },
      onDelete: 'CASCADE'
    },
    treatments: {
      type: 'one-to-many',
      target: 'treatments',
      inverseSide: 'appointmentId'
    },
    healthReports: {
      type: 'one-to-many',
      target: 'health-reports',
      inverseSide: 'appointmentId'
    }
  }
})
