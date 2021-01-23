import { FilterRootFields } from 'apollo-server-express';
import { Field, ObjectType } from 'type-graphql';
import { PageInfo } from '../common/dto/page-info.dto';
import { Customer } from './customer.model';

@ObjectType()
export class CustomerList {
    @Field(() => [Customer])
    items: Customer[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;
}
