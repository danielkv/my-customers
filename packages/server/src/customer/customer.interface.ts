import { GenderEnum } from '../common/enums/gender';

export interface ICustomer {
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
