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
        const filter: CustomerFilter | undefined = req?.query?.city ? { city: String(req.query.city) } : undefined;
        const pagination: Pagination = {
            offset: req?.query?.offset ? Number(req.query.offset) : undefined,
            limit: req?.query?.limit ? Number(req.query.limit) : undefined,
        };

        // find customers
        const filteredCustomers = await this.customerService.findMany(filter, pagination).catch((err) => next(err));

        // count all customers
        const countCustomers = await this.customerService.findMany(filter, undefined, false);

        // response
        return res.json({
            items: filteredCustomers,
            pageInfo: this.pageInfoHelper.get(countCustomers.length, pagination),
        });
    }
}

export const customerController = new CustomerController();
