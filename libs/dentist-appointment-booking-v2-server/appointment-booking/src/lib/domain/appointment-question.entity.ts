import { EntitySchema } from 'typeorm';
import { AppointmentQuestion } from './appointment-question.model';

export const AppointmentQuestionEntity = new EntitySchema<AppointmentQuestion>({
  name: 'appointment-questions',
  columns: {
    id: {
      type: 'uuid',
      generated: 'uuid',
      primary: true
    },
    question: {
      type: String,
    },
    subquestion: {
      type: String,
      nullable: true
    },
    womenOnly: {
      type: Boolean,
      default: false
    }
  },
  relations: {
    healthFact: {
      eager: true,
      type: 'one-to-one',
      target: 'health-facts',
      inverseSide: 'questionId'
    },
  }
});
