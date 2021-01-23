import { NextFunction, Request, Response } from 'express';
import { Arg, Query } from 'type-graphql';
import { PageInfoHelper } from '../common/helpers/page-info.helper';
import { Pagination } from '../common/types/pagination';
import { customerRepository } from '../customer/repository/customer.repository';
import { CityList } from './city-list.dto';
import { City } from './city.model';
import { CityService } from './city.service';
import { cityRepository } from './repository/city.repository';

/**
 * It controls the cities requests /  responses
 * This class is a singleton to avoid reinstaciate properties
 */
class CityResolver {
    private cityRepository: CityService;
    private pageInfoHelper: PageInfoHelper;

    /**
     * Instanciate all properties needed
     */
    constructor() {
        this.cityRepository = new CityService(cityRepository, customerRepository);
        this.pageInfoHelper = new PageInfoHelper();
    }

    @Query(() => City)
    async findOneCity(@Arg('search') search: string): Promise<City> {
        // find city by name
        const city = await this.cityRepository.findOne(search);

        // check if found city
        if (!city) throw Error('City not found');

        // response
        return city;
    }

    @Query(() => CityList)
    async findManyCities(
        @Arg('offset', { nullable: true }) offset?: number,
        @Arg('limit', { nullable: true }) limit?: number,
    ): Promise<CityList> {
        const pagination: Pagination = {
            offset,
            limit,
        };

        // find cities
        const filteredCities = await this.cityRepository.findMany(pagination);

        // count all cities
        const countCities = await this.cityRepository.findMany();

        // response
        return {
            items: filteredCities,
            pageInfo: this.pageInfoHelper.get(countCities.length, pagination),
        };
    }
}

export const cityResolver = new CityResolver();
