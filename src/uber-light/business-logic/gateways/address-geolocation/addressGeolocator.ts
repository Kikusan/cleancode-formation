export interface AddressGeolocator {
  checkCity(point: string, expectedCity: string): Promise<boolean>;
}
