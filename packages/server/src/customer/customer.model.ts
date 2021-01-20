import { ICustomer } from './customer.interface';

export class Customer {
    constructor(customer: Partial<ICustomer>) {
        Object.assign(this, customer);
    }

    id: number;

    first_name: string;

    last_name: string;

    email: string;

    gender: string;

    company: string;

    city: string;

    title: string;

    lat?: number;

    long?: number;
}
