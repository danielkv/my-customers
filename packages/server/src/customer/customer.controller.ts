import { NextFunction, Request, Response } from 'express';
import { PageInfoHelper } from '../common/helpers/page-info.helper';
import { Pagination } from '../common/types/pagination';
import { ICacheProvider } from '../providers/cache/cache-provider.interface';
import { NodeCacheProvider } from '../providers/cache/node-cache.provider';
import { GoogleProvider } from '../providers/location/google.provider';
import { ILocationProvider } from '../providers/location/location-provider.interface';
import { CustomerService } from './customer.service';
import { CustomerFilter } from './repository/customer-filter.type';
import { customerRepository } from './repository/customer.repository';

/**
 * It controls the customers requests /  responses
 * This class is a singleton to avoid reinstaciate properties
 */
class CustomerController {
    protected cacheProvider: ICacheProvider;
    protected locationProvider: ILocationProvider;
    protected customerService: CustomerService;
    protected pageInfoHelper: PageInfoHelper;

    /**
     * Instanciate all properties needed
     */
    constructor() {
        this.cacheProvider = new NodeCacheProvider();
        this.locationProvider = new GoogleProvider(this.cacheProvider);
        this.customerService = new CustomerService(customerRepository, this.locationProvider);
        this.pageInfoHelper = new PageInfoHelper();
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        // extract body params and check if it's defined
        const customerId = req?.params?.customerId;
        if (!customerId) return next(new Error('CustomerId not provided'));

        // find customer by id
        const customer = await this.customerService.findOne(Number(customerId)).catch((err) => next(err));

        // response
        return res.json(customer);
    }

    async findMany(req: Request, res: Response, next: NextFunction) {
        const filter: CustomerFilter = req.body.filter;
        const pagination: Pagination = req.body.pagination;

        // find customers
        const filteredCustomers = await this.customerService.findMany(filter, pagination);

        // count all customers
        const countCustomers = await this.customerService.findMany(filter, pagination);

        // response
        return res.json({
            items: filteredCustomers,
            pageInfo: this.pageInfoHelper.get(countCustomers.length, pagination),
        });
    }
}

export const customerController = new CustomerController();
