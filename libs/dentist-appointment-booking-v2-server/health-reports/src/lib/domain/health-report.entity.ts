import { EntitySchema } from 'typeorm';
import { HealthReport } from './health-report.model';

export const HealthReportEntity = new EntitySchema<HealthReport>({
  name: 'health-reports',
  columns: {
    appointmentId: {
      type: String,
      primary: true
    },
    healthFactId: {
      type: String,
      primary: true
    },
    additionalInfo: {
      type: String,
      nullable: true
    }
  },
  relations: {
    appointmentId: {
      type: 'many-to-one',
      target: 'appointments',
      joinColumn: {
        name: 'appointmentId',
        referencedColumnName: 'id'
      },
      onDelete: 'CASCADE'
    },
    healthFactId: {
      type: 'many-to-one',
      target: 'health-facts',
      joinColumn: {
        name: 'healthFactId',
        referencedColumnName: 'id'
      }
    }
  },
  indices: [
    {
      name: 'primary-key-health-reports',
      columns: ['appointmentId', 'healthFactId'],
      unique: true
    }
  ]
});
