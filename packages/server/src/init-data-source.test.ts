import { customerRepository } from './customer/repository/customer.repository';
import { initDataSource } from './init-data-source';

test('Initialize data source', async () => {
    await initDataSource.execute();

    const customers = await customerRepository.findMany();

    expect(customers.length).toBe(1000);
});
