import { EntitySchema } from "typeorm"
import { User } from './user.model';

export const UserEntity = new EntitySchema<User>({
  name: "users",
  columns: {
    id: {
      type: String,
      primary: true
    },
    email: {
      type: String,
      nullable: false
    },
    firstName: {
      type: String,
      nullable: false
    },
    lastName: {
      type: String,
      nullable: false
    },
    photoUrl: {
      type: String,
      nullable: true
    }
  },
  relations: {
    appointments: {
      type: 'one-to-many',
      target: 'appointments',
      inverseSide: 'userId',
      cascade: true
    }
  }
})
