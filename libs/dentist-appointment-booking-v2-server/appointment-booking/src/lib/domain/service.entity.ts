import { EntitySchema } from 'typeorm';
import { Service } from './service.model';

export const ServiceEntity = new EntitySchema<Service>({
  name: 'services',
  columns: {
    id: {
      type: 'uuid',
      generated: 'uuid',
      primary: true
    },
    name: {
      type: String,
      nullable: false
    },
    length: {
      type: Number,
      nullable: true
    },
    price: {
      type: Number,
      nullable: true
    },
    detail: {
      type: Number,
      unique: true,
      nullable: false
    },
    count: {
      type: Number,
      nullable: false
    }
  }
})
