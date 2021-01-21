import { Pagination } from '../../common/types/pagination';
import { ICity } from '../city.interface';
import { City } from '../city.model';
import { ICityRepository } from './city-repository.interface';

/**
 * This class used as a sigleton to mantain the cities saved in memory
 */
class CityRepository implements ICityRepository {
    private cities: City[] = [];

    async create(city: Partial<ICity>): Promise<City> {
        const cityInstace = new City(city);

        this.cities.push(cityInstace);

        return cityInstace;
    }

    async findOne(cityName: string): Promise<City | undefined> {
        const cityFound = this.cities.find((city) => city.city.includes(cityName));

        if (!cityFound) return undefined;

        return cityFound;
    }

    async findMany(pagination?: Pagination): Promise<City[]> {
        const start = !pagination ? 0 : pagination.offset;
        const end = !pagination ? undefined : pagination.offset + pagination.limit;

        const cities = this.cities.slice(start, end);

        return cities;
    }
}

export const cityRepository = new CityRepository();
