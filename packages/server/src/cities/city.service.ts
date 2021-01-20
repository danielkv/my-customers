import { Pagination } from '../common/types/pagination';
import { ICity } from './city.interface';
import { City } from './city.model';
import { ICityRepository } from './repository/city-repository.interface';

export class CityService {
    constructor(private cityRepository: ICityRepository) {}

    create(city: ICity): Promise<City> {
        return this.cityRepository.create(city);
    }

    async find(cityName: String): Promise<City | null> {
        // find city by city name
        const city = this.cityRepository.find(cityName);

        // check if city exists
        if (!city) throw new Error('City not found');

        return city;
    }

    list(pagination?: Pagination) {
        return this.cityRepository.list(pagination);
    }
}
