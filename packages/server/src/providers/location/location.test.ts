import { GoogleProvider } from './google.provider';
import { NodeCacheProvider } from '../cache/node-cache.provider';
import { ICoordinates } from './location-provider.interface';

test('Find location', async () => {
    const cacheProvider = new NodeCacheProvider();
    const locationProvider = new GoogleProvider(cacheProvider);

    const coordinates = await locationProvider.searchCoordinates('Warner,  NH');

    expect(coordinates).toMatchObject<ICoordinates>({ lat: 43.2556568, lng: -71.8334145 });
});
