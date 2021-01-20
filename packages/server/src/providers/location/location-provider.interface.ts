export interface ICoordinates {
    lat: number;
    lng: number;
}

/**
 * Location Provider
 * This interface is usefull in case it's needed to change the map provider
 */
export interface ILocationProvider {
    /**
     * Returns the coordinates from a given search string
     * @param search Search string
     */
    searchCoordinates(search: string): Promise<ICoordinates>;
}
