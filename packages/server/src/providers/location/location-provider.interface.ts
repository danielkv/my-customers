export interface ICoordinates {
    lat: number;
    lng: number;
}
export interface ILocationProvider {
    searchCoordinates(search: string): Promise<ICoordinates>;
}
