import { AddressGeolocator } from '../../../../business-logic/gateways/address-geolocation/addressGeolocator';

export class FakeAddressGeolocator implements AddressGeolocator {
  async checkCity(point: string, expectedCity: string): Promise<boolean> {
    return point.toLowerCase().indexOf(expectedCity.toLowerCase()) !== -1;
  }
}
