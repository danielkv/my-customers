import { Field, InputType } from 'type-graphql';

@InputType()
export class CustomerFilter {
    @Field({ nullable: true })
    city?: string;
}
