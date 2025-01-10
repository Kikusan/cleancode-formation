import { BookingRepository } from '../gateways/repositories/bookingRepository';
import { UUIDGenerator } from '../gateways/uuid-generation/uuidGenerator';
import { AddressGeolocator } from '../gateways/address-geolocation/addressGeolocator';
import { TravellerRepository } from '../gateways/repositories/travellerRepository';
import { Traveller } from '../domain/traveller';
import { DateProvider } from '../gateways/date-provision/dateProvider';

export class BookUber {
  constructor(
    private bookingRepository: BookingRepository,
    private uuidGenerator: UUIDGenerator,
    private addressGeolocator: AddressGeolocator,
    private travellerRepository: TravellerRepository,
    private dateProvider: DateProvider,
  ) {}

  async handle(
    travellerId: string,
    startPoint: string,
    endPoint: string,
  ): Promise<void> {
    const traveller: Traveller | undefined =
      await this.travellerRepository.byId(travellerId);
    const [isStartInParis, isEndInParis] = await this.determineZonesOfEndPoint(
      startPoint,
      endPoint,
    );
    const trip = traveller.wantTrip(startPoint, endPoint);
    const booking = trip.book(
      this.nextBookingId(),
      isStartInParis,
      isEndInParis,
      traveller,
      this.dateProvider,
    );
    return this.bookingRepository.save(booking);
  }

  private async determineZonesOfEndPoint(startPoint: string, endPoint: string) {
    return await Promise.all([
      this.inParis(startPoint),
      this.inParis(endPoint),
    ]);
  }

  private inParis(point: string) {
    return this.addressGeolocator.checkCity(point, 'Paris');
  }

  private nextBookingId() {
    return this.uuidGenerator.generate();
  }
}
