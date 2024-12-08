import { AssociatedService } from '../shared';

export interface Appointment {
    readonly id: string;
    readonly startsAt: Date;
    readonly services: AssociatedService[];
}
