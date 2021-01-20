import { Pagination } from '../../common/types/pagination';
import { ICustomer } from '../customer.interface';
import { Customer } from '../customer.model';
import { ICustomerRepository } from './customer-repository.interface';

/**
 * This class used as a sigleton to mantain the customers saved in memory
 */
class CustomerRepository implements ICustomerRepository {
    private customers: Customer[] = [];

    async create(customer: ICustomer): Promise<Customer> {
        const cityInstace = new Customer(customer);

        this.customers.push(cityInstace);

        return cityInstace;
    }

    async find(id: number): Promise<Customer | undefined> {
        const customerFound = this.customers.find((customer) => customer.id === id);

        if (!customerFound) return undefined;

        return customerFound;
    }

    async list(city: string, pagination?: Pagination): Promise<Customer[]> {
        const customersFound = this.customers.filter((customer) => customer.city === city);

        const start = !pagination ? 0 : pagination.offset;
        const end = !pagination ? undefined : pagination.offset + pagination.limit;

        const cities = customersFound.slice(start, end);

        return cities;
    }
}

export const customerRepository = new CustomerRepository();
