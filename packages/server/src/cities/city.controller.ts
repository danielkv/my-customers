import { NextFunction, Request, Response } from 'express';
import { PageInfoHelper } from '../common/helpers/page-info.helper';
import { Pagination } from '../common/types/pagination';
import { customerRepository } from '../customer/repository/customer.repository';
import { CityService } from './city.service';
import { cityRepository } from './repository/city.repository';

/**
 * It controls the cities requests /  responses
 * This class is a singleton to avoid reinstaciate properties
 */
class CityController {
    private cityRepository: CityService;
    private pageInfoHelper: PageInfoHelper;

    /**
     * Instanciate all properties needed
     */
    constructor() {
        this.cityRepository = new CityService(cityRepository, customerRepository);
        this.pageInfoHelper = new PageInfoHelper();
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        // extract body params and check if it's defined
        const search: string = req?.body?.search;
        if (!search) return next(new Error('Search is not provided'));

        // find city by name
        const city = await this.cityRepository.findOne(search).catch((err) => next(err));

        // response
        return res.json(city);
    }

    async findMany(req: Request, res: Response, next: NextFunction) {
        const pagination: Pagination = req.body.pagination;

        // find cities
        const filteredCities = await this.cityRepository.findMany(pagination);

        // count all cities
        const countCities = await this.cityRepository.findMany();

        // response
        return res.json({
            items: filteredCities,
            pageInfo: this.pageInfoHelper.get(countCities.length, pagination),
        });
    }
}

export const cityController = new CityController();
