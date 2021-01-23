import { ICustomer } from './customer.interface';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Customer {
    constructor(customer: Partial<ICustomer>) {
        Object.assign(this, customer);
    }

    @Field()
    id: number;

    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field()
    email: string;

    @Field()
    gender: string;

    @Field()
    company: string;

    @Field()
    city: string;

    @Field()
    title: string;

    @Field({ nullable: true })
    lat?: number;

    @Field({ nullable: true })
    long?: number;
}
