import { EntitySchema } from 'typeorm';
import { HealthFact } from './health-fact.model';

export const HealthFactEntity = new EntitySchema<HealthFact>({
  name: 'health-facts',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    value: { type: String },
    questionId: {type: 'uuid'}
  },
  relations: {
    questionId: {
      type: 'one-to-one',
      target: 'appointment-questions',
      joinColumn: {
        name: 'questionId',
        referencedColumnName: 'id',
      },
    }
  }
});
