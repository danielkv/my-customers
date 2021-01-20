import { Pagination } from '../common/types/pagination';
import { ICustomer } from './customer.interface';
import { Customer } from './customer.model';
import { CustomerFilter } from './repository/customer-filter.type';
import { ICustomerRepository } from './repository/customer-repository.interface';

export class CustomerService {
    constructor(private customerRepository: ICustomerRepository) {}

    create(customer: ICustomer): Promise<Customer> {
        return this.customerRepository.create(customer);
    }

    async findOne(id: number): Promise<Customer> {
        const foundCustomer = await this.customerRepository.findOne(id);

        if (!foundCustomer) throw new Error('Customer not found');

        return foundCustomer;
    }

    async findMany(filter?: CustomerFilter, pagination?: Pagination): Promise<Customer[]> {
        return this.customerRepository.findMany(filter, pagination);
    }
}
