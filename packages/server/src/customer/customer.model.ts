import { GenderEnum } from '../common/enums/gender';
import { ICustomer } from './customer.interface';

export class Customer {
    constructor(customer: Partial<ICustomer>) {
        Object.assign(this, customer);
    }

    id: number;

    first_name: string;

    last_name: string;

    email: string;

    gender: GenderEnum;

    company: string;

    city: string;

    title: string;

    lat?: number;

    long?: number;
}
