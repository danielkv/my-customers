import { GoogleProvider } from '../providers/location/google.provider';
import { CustomerService } from './customer.service';
import { customerRepository } from './repository/customer.repository';
import { NodeCacheProvider } from '../providers/cache/node-cache.provider';

const cacheProvider = new NodeCacheProvider();
const locationProvider = new GoogleProvider(cacheProvider);
const customerService = new CustomerService(customerRepository, locationProvider);

test('Create new customer', async () => {
    await expect(customerService.create({ first_name: 'daniel', last_name: 'guolo' })).resolves.toMatchObject({
        first_name: 'daniel',
        last_name: 'guolo',
    });
});

test('Find customer by ID', async () => {
    await expect(customerService.findOne(2, false)).resolves.toMatchObject({
        id: 2,
        first_name: 'Margaret',
        last_name: 'Mendoza',
        email: 'mmendoza1@sina.com.cn',
        gender: 'Female',
        company: 'Skipfire',
        city: 'East Natchitoches, PA',
        title: 'VP Marketing',
    });
});

test('Find customer by ID (Not finding)', async () => {
    await expect(customerService.findOne(1010, false)).rejects.toThrowError();
});

test('Find many users from a given city', async () => {
    const customers = await customerService.findMany({ city: 'Warner, NH' }, undefined, false);

    expect(customers.length).toBe(20);
});
