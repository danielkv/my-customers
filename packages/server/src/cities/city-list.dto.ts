import { Field, ObjectType } from 'type-graphql';
import { PageInfo } from '../common/dto/page-info.dto';
import { City } from './city.model';

@ObjectType()
export class CityList {
    @Field(() => [City])
    items: City[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;
}
