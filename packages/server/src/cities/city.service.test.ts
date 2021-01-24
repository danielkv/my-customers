import { customerRepository } from '../customer/repository/customer.repository';
import { CityService } from './city.service';
import { cityRepository } from './repository/city.repository';

const cityService = new CityService(cityRepository, customerRepository);

test('Create new city', async () => {
    await expect(cityService.create({ city: 'Sombrio' })).resolves.toMatchObject({
        city: 'Sombrio',
    });
});

test('Find city by name', async () => {
    const city = 'Lyon, WV';

    const customers = await customerRepository.findMany({ city });

    await expect(cityService.findOne('Lyon, WV')).resolves.toMatchObject({
        city,
        customers_total: customers.length,
    });
});

test('Find city by name (Not finding)', async () => {
    await expect(cityService.findOne('No city')).rejects.toThrowError();
});

test('Find many users from a given city', async () => {
    await expect(cityService.findMany()).resolves.not.toBeNaN();
});
