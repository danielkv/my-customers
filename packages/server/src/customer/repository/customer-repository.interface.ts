import { Pagination } from '../../common/types/pagination';
import { ICustomer } from '../customer.interface';
import { Customer } from '../customer.model';

/**
 * Customer interface to connect to the repository (DB, memory, etc)
 */
export interface ICustomerRepository {
    /**
     * This function creates a new instance of Customer and inserts into a reporitory
     * @param customer Customer to be created and inserted into repository
     */
    create(customer: ICustomer): Promise<Customer>;

    /**
     * Finds the customer within the given id
     * @param id id of the customer
     */
    find(id: number): Promise<Customer | undefined>;

    /**
     * Lists the customers from a given city
     * @param pagination {offset, limit}
     */
    list(city: string, pagination?: Pagination): Promise<Customer[]>;
}
