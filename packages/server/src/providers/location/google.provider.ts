import { Client } from '@googlemaps/google-maps-services-js';
import { ICoordinates, ILocationProvider } from './location-provider.interface';

const gMapsClient = new Client({});

export class GoogleProvider implements ILocationProvider {
    async searchCoordinates(search: string): Promise<ICoordinates> {
        const response = await gMapsClient.geocode({
            params: { address: escape(search), key: process.env.GOOGLE_MAPS_API_KEY || '' },
        });

        const coordinates = response.data.results[0].geometry.location;

        return coordinates;
    }
}
