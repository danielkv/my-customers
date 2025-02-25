import { ExtractPaginationHelper } from '../../common/helpers/extract-pagination.helper';
import { Pagination } from '../../common/types/pagination';
import { ICustomer } from '../customer.interface';
import { Customer } from '../customer.model';
import { CustomerFilter } from './customer-filter.type';
import { ICustomerRepository } from './customer-repository.interface';

/**
 * This class used as a sigleton to mantain the customers saved in memory
 */
class CustomerRepository implements ICustomerRepository {
    private customers: Customer[] = [];

    constructor(private paginationHelper: ExtractPaginationHelper) {}

    async create(customer: Partial<ICustomer>): Promise<Customer> {
        const cityInstace = new Customer(customer);

        this.customers.push(cityInstace);

        return cityInstace;
    }

    async findOne(id: number): Promise<Customer | undefined> {
        const customerFound = this.customers.find((customer) => customer.id === id);

        if (!customerFound) return undefined;

        return customerFound;
    }

    async findMany(filter?: CustomerFilter, pagination?: Pagination): Promise<Customer[]> {
        const filteredCustomers = this.applyFilter(this.customers, filter);

        const { start, end } = this.paginationHelper.execute(pagination);

        const cities = filteredCustomers.slice(start, end);

        return cities;
    }

    /**
     * appy filters to a customers, which in this case I know it's only CITY
     * It may be scaled to a more complex code if needed
     */
    private applyFilter(customers: Customer[], filter?: CustomerFilter): Customer[] {
        if (!filter?.city) return customers;

        return customers.filter((customer) => customer.city === filter.city);
    }
}

const pageInfoHelper = new ExtractPaginationHelper();
export const customerRepository = new CustomerRepository(pageInfoHelper);
