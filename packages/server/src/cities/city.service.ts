import { Pagination } from '../common/types/pagination';
import { ICustomerRepository } from '../customer/repository/customer-repository.interface';
import { ICity } from './city.interface';
import { City } from './city.model';
import { ICityRepository } from './repository/city-repository.interface';

export class CityService {
    constructor(private cityRepository: ICityRepository, private customerRepository: ICustomerRepository) {}

    create(city: ICity): Promise<City> {
        return this.cityRepository.create(city);
    }

    async findOne(cityName: String): Promise<City | undefined> {
        // find city by city name
        const city = await this.cityRepository.findOne(cityName);

        // check if city exists
        if (!city) throw new Error('City not found');

        return this.hidrate(city);
    }

    async findMany(pagination?: Pagination, hidrate: boolean = true) {
        const cities = await this.cityRepository.findMany(pagination);

        if (hidrate) return cities.map((city) => this.hidrate(city));

        return cities;
    }

    private async hidrate(city: City): Promise<City> {
        // find all customers within the given city
        const customersFound = await this.customerRepository.findMany({ city: city.city });

        // check if the city has any customer
        if (!customersFound?.length) return city;

        // hidrate with data
        const hidratedCity = new City({ ...city, customers_total: customersFound.length });

        // returns city
        return hidratedCity;
    }
}
