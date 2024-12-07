import { EntitySchema } from 'typeorm';
import { Treatment } from './treatment.model';

export const TreatmentEntity = new EntitySchema<Treatment>({
  name: 'treatments',
  columns: {
    id: {
      type: 'uuid',
      generated: 'uuid',
      primary: true
    },
    quantity: {
      type: Number
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
    serviceId: {
      type: 'many-to-one',
      target: 'services',
      joinColumn: {
        name: 'serviceId',
        referencedColumnName: 'id'
      }
    }
  }
})
