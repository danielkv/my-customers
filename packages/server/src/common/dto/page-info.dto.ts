import { Field, ObjectType } from 'type-graphql';

@ObjectType('PageInfo')
export class PageInfo {
    @Field({ nullable: true })
    itemsTotal: number;

    @Field({ nullable: true })
    limit?: number;

    @Field({ nullable: true })
    offset?: number;
}
