import customersData from '../customers.json';
import { ICity } from './cities/city.interface';
import { City } from './cities/city.model';
import { ICityRepository } from './cities/repository/city-repository.interface';
import { ICustomer } from './customer/customer.interface';
import { Customer } from './customer/customer.model';
import { ICustomerRepository } from './customer/repository/customer-repository.interface';
import { customerRepository } from './customer/repository/customer.repository';
import { cityRepository } from './cities/repository/city.repository';

class InitDataSource {
    constructor(private cityRepository: ICityRepository, private customerRepository: ICustomerRepository) {}

    /**
     * Execute all actions to insert all data to repository
     */
    async execute(customersData: ICustomer[]): Promise<void> {
        await this.insertCities(customersData);
        await this.insertCustomers(customersData);
    }
    /**
     * Insert cities to repository
     */
    private insertCities(customersData: ICustomer[]): Promise<City[]> {
        const cities = customersData.reduce<ICity[]>((allCities, customer) => {
            const city = customer.city;
            if (!allCities.find((c) => c.city === city)) allCities.push({ city, customers_total: 0 });
            return allCities;
        }, []);

        return Promise.all(cities.map((city) => this.cityRepository.create(city)));
    }

    /**
     * Insert customers to the repostory
     */
    private insertCustomers(customersData: ICustomer[]): Promise<Customer[]> {
        return Promise.all(customersData.map((customer) => this.customerRepository.create(customer)));
    }
}

const initDataSource = new InitDataSource(cityRepository, customerRepository);
initDataSource.execute(customersData);
