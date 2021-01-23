import { Field, ObjectType } from 'type-graphql';
import { ICity } from './city.interface';

@ObjectType()
export class City {
    constructor(city: Partial<ICity>) {
        Object.assign(this, city);
        if (!this.customers_total) this.customers_total = 0;
    }

    @Field()
    city: string;

    @Field({ nullable: true })
    customers_total?: number;
}
