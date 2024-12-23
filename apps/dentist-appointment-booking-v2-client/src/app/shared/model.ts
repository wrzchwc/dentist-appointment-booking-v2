export interface Service {
    readonly id: string;
    readonly name: string;
    readonly count: 1;
    readonly length: number;
    price: number | null;
    readonly detail: 'A' | null;
}

export interface AssociatedService extends Service {
    readonly appointmentServices: AppointmentServices;
}

interface AppointmentServices {
    readonly quantity: number;
}

export interface PriceItem {
    readonly price: number | null;
    readonly detail: string | null;
    readonly quantity: number;
}

export interface NamedPriceItem extends PriceItem {
    readonly name: string;
}
