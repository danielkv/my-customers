import { Pagination } from '../../common/types/pagination';
import { ICity } from '../city.interface';
import { City } from '../city.model';

/**
 * City interface to connect to the repository (DB, memory, etc)
 */
export interface ICityRepository {
    /**
     * This function creates a new instance of City and inserts it to a reporitory
     * @param city City to be created and inserted to a repository
     */
    create(city: Partial<ICity>): Promise<City>;

    /**
     * Finds the city with the given param name
     * @param cityName Name of the city
     */
    find(cityName: String): Promise<City | null>;

    /**
     * Lists the cities
     * @param pagination {offset, limit}
     */
    list(pagination?: Pagination): Promise<City[]>;
}
