import { Pagination } from '../common/types/pagination';
import { ILocationProvider } from '../providers/location/location-provider.interface';
import { ICustomer } from './customer.interface';
import { Customer } from './customer.model';
import { CustomerFilter } from './repository/customer-filter.type';
import { ICustomerRepository } from './repository/customer-repository.interface';

export class CustomerService {
    constructor(private customerRepository: ICustomerRepository, private locationProvider: ILocationProvider) {}

    create(customer: Partial<ICustomer>): Promise<Customer> {
        return this.customerRepository.create(customer);
    }

    async findOne(id: number, hidrate: boolean = true): Promise<Customer> {
        const foundCustomer = await this.customerRepository.findOne(id);

        if (!foundCustomer) throw new Error('Customer not found');

        // hidrate customer with coordinates and returns it
        return hidrate ? this.hidrate(foundCustomer) : foundCustomer;
    }

    async findMany(filter?: CustomerFilter, pagination?: Pagination, hidrate: boolean = true): Promise<Customer[]> {
        const foundCustomers = await this.customerRepository.findMany(filter, pagination);

        // hidrates customers with coordinates and returns it
        return Promise.all(foundCustomers.map((customer) => (hidrate ? this.hidrate(customer) : customer)));
    }

    /**
     * Find the coordinates and inject it in right properties for each customer
     */
    private async hidrate(customer: Customer): Promise<Customer> {
        // check if lat and long properties are available, if true return the customer (doesn't need to search again)
        if (customer.lat && customer.long) return customer;

        // search for coordinates and check if it was found
        const coordinates = await this.locationProvider
            .searchCoordinates(customer.city)
            .catch(() => ({ lat: undefined, lng: undefined }));
        if (!coordinates) return customer;

        // hidrate with data
        const hidratedCustomer = new Customer({ ...customer, lat: coordinates.lat, long: coordinates.lng });

        // return the customer
        return hidratedCustomer;
    }
}
