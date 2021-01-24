import { customerRepository } from './customer/repository/customer.repository';

test('Initialized data source', async () => {
    const customers = await customerRepository.findMany();

    expect(customers.length).toBe(1000);
});
