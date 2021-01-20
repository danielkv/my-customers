import { ICity } from './city.interface';

export class City {
    constructor(city: Partial<ICity>) {
        Object.assign(this, city);
        if (!this.customers_total) this.customers_total = 0;
    }

    city: string;

    customers_total?: number;
}
