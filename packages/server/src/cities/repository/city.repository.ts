import { Pagination } from '../../common/types/pagination';
import { ICity } from '../city.interface';
import { City } from '../city.model';
import { ICityRepository } from './city-repository.interface';

/**
 * This class used as a sigleton to mantain the cities saved in memory
 */
class CityRepository implements ICityRepository {
    private cities: City[] = [];

    async create(city: ICity): Promise<City> {
        const cityInstace = new City();

        cityInstace.city = city.city;
        cityInstace.customers_total = city.customers_total;

        this.cities.push(cityInstace);

        return cityInstace;
    }

    async find(cityName: String): Promise<City | null> {
        const cityFound = this.cities.find((city) => city.city === cityName);

        if (!cityFound) return null;

        return cityFound;
    }

    async list(pagination?: Pagination): Promise<City[]> {
        const start = !pagination ? 0 : pagination.offset;
        const end = !pagination ? undefined : pagination.offset + pagination.limit;

        const cities = this.cities.slice(start, end);

        return cities;
    }
}

export const cityRepository = new CityRepository();
