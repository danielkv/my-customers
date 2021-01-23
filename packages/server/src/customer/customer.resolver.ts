import { NextFunction, Request, Response } from 'express';
import { Arg, Query, Resolver } from 'type-graphql';
import { PageInfoHelper } from '../common/helpers/page-info.helper';
import { Pagination } from '../common/types/pagination';
import { ICacheProvider } from '../providers/cache/cache-provider.interface';
import { NodeCacheProvider } from '../providers/cache/node-cache.provider';
import { GoogleProvider } from '../providers/location/google.provider';
import { ILocationProvider } from '../providers/location/location-provider.interface';
import { CustomerList } from './customer-list.dto';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';
import { CustomerFilter } from './repository/customer-filter.type';
import { customerRepository } from './repository/customer.repository';

/**
 * The customer resolver
 */

@Resolver()
class CustomerResolver {
    private cacheProvider: ICacheProvider;
    private locationProvider: ILocationProvider;
    private customerService: CustomerService;
    private pageInfoHelper: PageInfoHelper;

    /**
     * Instanciate all properties needed
     */
    constructor() {
        this.cacheProvider = new NodeCacheProvider();
        this.locationProvider = new GoogleProvider(this.cacheProvider);
        this.customerService = new CustomerService(customerRepository, this.locationProvider);
        this.pageInfoHelper = new PageInfoHelper();
    }

    @Query(() => Customer)
    async findOneCustomer(@Arg('customerId') customerId: number): Promise<Customer> {
        // find customer by id
        const customer = await this.customerService.findOne(Number(customerId));

        // return
        return customer;
    }

    @Query(() => CustomerList)
    async findManyCustomers(
        @Arg('filter', { nullable: true }) filter?: CustomerFilter,
        @Arg('offset', { nullable: true }) offset?: number,
        @Arg('limit', { nullable: true }) limit?: number,
    ): Promise<CustomerList> {
        const pagination: Pagination = {
            offset,
            limit,
        };

        // find customers
        const filteredCustomers = await this.customerService.findMany(filter, pagination);

        // count all customers
        const countCustomers = await this.customerService.findMany(filter, undefined, false);

        // response
        return {
            items: filteredCustomers,
            pageInfo: this.pageInfoHelper.get(countCustomers.length, pagination),
        };
    }
}

export const customerResolver = new CustomerResolver();
