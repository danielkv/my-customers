import { GoogleProvider } from '../providers/location/google.provider';
import { CustomerService } from './customer.service';
import { customerRepository } from './repository/customer.repository';
import { NodeCacheProvider } from '../providers/cache/node-cache.provider';
import { initDataSource } from '../init-data-source';

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
    await initDataSource.execute();

    const customers = await customerRepository.findMany();

    await expect(customerService.findOne(2)).resolves.toMatchObject(customers.find((c) => c.id == 2));
});

test('Find customer by ID (Not finding)', async () => {
    await initDataSource.execute();

    await expect(customerService.findOne(1010)).rejects.toThrowError();
});
