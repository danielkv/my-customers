import { Client } from '@googlemaps/google-maps-services-js';
import { ICacheProvider } from '../cache/cache-provider.interface';
import { ICoordinates, ILocationProvider } from './location-provider.interface';

const gMapsClient = new Client({});

export class GoogleProvider implements ILocationProvider {
    constructor(private cacheProvider: ICacheProvider) {}
    /**
     * Returns the coordinates from a given search string and cache it for the next time
     * The key of the cache will be the scaped search string
     * @param search search string
     */
    async searchCoordinates(search: string): Promise<ICoordinates> {
        // escape search
        const scapedSearch = escape(search.replace(/\,/g, ''));

        // check results in cache
        const cachedCoordinates = await this.cacheProvider.get(scapedSearch);
        if (cachedCoordinates) return JSON.parse(cachedCoordinates);

        // search for coordinates
        const response = await gMapsClient.geocode({
            params: { address: scapedSearch, key: process.env.GOOGLE_MAPS_API_KEY || '' },
        });

        // get and check coordinates
        const coordinates = response?.data?.results?.[0]?.geometry?.location || null;

        if (!coordinates) throw new Error("Coordinates for this locations weren't found");

        // cache the results
        const stringCoordinates = JSON.stringify(coordinates);
        await this.cacheProvider.add(scapedSearch, stringCoordinates);

        // return coordinates
        return coordinates;
    }
}
