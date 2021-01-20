import { ICity } from './city.interface';

export class City {
    constructor(city: Partial<ICity>) {
        Object.assign(this, city);
    }

    city: string;

    customers_total?: number;
}
