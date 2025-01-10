import { BookUber } from './bookUber';
import { FakeUuidGenerator } from '../../adapters/secondary/gateways/uuid-generation/fakeUuidGenerator';
import { AddressGeolocator } from '../gateways/address-geolocation/addressGeolocator';
import { FakeAddressGeolocator } from '../../adapters/secondary/gateways/address-geolocation/fakeAddressGeolocator';
import { DeterministicDateProvider } from '../../adapters/secondary/gateways/date-provision/deterministicDateProvider';
import { Traveller } from '../domain/traveller';
import { InMemoryBookingRepository } from '../../adapters/secondary/gateways/repositories/fake/inMemoryBookingRepository';
import { InMemoryTravellerRepository } from '../../adapters/secondary/gateways/repositories/fake/inMemoryTravellerRepository';

describe('Uber booking', () => {
  let bookingRepository: InMemoryBookingRepository;
  let uuidGenerator: FakeUuidGenerator;
  let bookUber: BookUber;
  let addressGeolocator: AddressGeolocator;
  let travellerRepository: InMemoryTravellerRepository;
  let dateProvider: DeterministicDateProvider;
  const travellerId = '222ddd';

  beforeEach(() => {
    bookingRepository = new InMemoryBookingRepository();
    uuidGenerator = new FakeUuidGenerator();
    addressGeolocator = new FakeAddressGeolocator();
    travellerRepository = new InMemoryTravellerRepository();
    dateProvider = new DeterministicDateProvider();
    bookUber = new BookUber(
      bookingRepository,
      uuidGenerator,
      addressGeolocator,
      travellerRepository,
      dateProvider,
    );
    uuidGenerator.nextUUID = '123abc';
    travellerRepository.feedWith(
      new Traveller({
        id: travellerId,
        birthDate: new Date(2009, 3, 4),
      }),
    );
    dateProvider.dateNow = new Date(2009, 3, 6);
  });

  describe('From Paris to outside', () => {
    it('should book an uber freely', async () => {
      await bookUber.handle(
        '222ddd',
        '111 avenue Victor Hugo 92000 Aubervilliers',
        '10 avenue Foch 75008 Paris',
      );
      expectBookings(
        '123abc',
        '222ddd',
        '111 avenue Victor Hugo 92000 Aubervilliers',
        '10 avenue Foch 75008 Paris',
        0,
      );
    });
  });

  describe('From outside to Paris', () => {
    it('should book an uber at the corresponding standard price', async () => {
      await bookUber.handle(
        '222ddd',
        '10 avenue Foch 75008 Paris',
        '111 avenue Victor Hugo 92000 Aubervilliers',
      );
      expectBookings(
        '123abc',
        '222ddd',
        '10 avenue Foch 75008 Paris',
        '111 avenue Victor Hugo 92000 Aubervilliers',
        50,
      );
    });

    describe("It's my birthday", () => {
      const travellerBirthDate = new Date(2009, 3, 4);

      beforeEach(() => {
        dateProvider.dateNow = travellerBirthDate;
      });

      it('should benefit of the deserved discount for the booking', async () => {
        await bookUber.handle(
          travellerId,
          '10 avenue Foch 75008 Paris',
          '111 avenue Victor Hugo 92000 Aubervilliers',
        );
        expectBookings(
          '123abc',
          travellerId,
          '10 avenue Foch 75008 Paris',
          '111 avenue Victor Hugo 92000 Aubervilliers',
          18,
        );
      });
    });
  });

  describe('Intra-Muros (Paris to Paris)', () => {
    it('should book an uber at the corresponding standard price when going intra-muros', async () => {
      const travellerId = '222ddd';
      await bookUber.handle(
        travellerId,
        '10 avenue Foch 75008 Paris',
        '11 rue de Courcelles 75008 Paris',
      );
      expectBookings(
        '123abc',
        travellerId,
        '10 avenue Foch 75008 Paris',
        '11 rue de Courcelles 75008 Paris',
        30,
      );
    });
  });

  const expectBookings = (
    id: string,
    travellerId: string,
    startPoint: string,
    endPoint: string,
    price: number,
  ) =>
    expect(bookingRepository.bookings).toEqual([
      {
        id,
        travellerId,
        startPoint,
        endPoint,
        price,
      },
    ]);
});
