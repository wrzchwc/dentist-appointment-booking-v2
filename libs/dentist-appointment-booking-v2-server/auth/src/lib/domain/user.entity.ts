import { EntitySchema } from "typeorm"
import { User } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/auth';

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
})
