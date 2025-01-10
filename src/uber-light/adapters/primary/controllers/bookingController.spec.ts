import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './bookingController';
import { BookingRepository } from '../../../business-logic/gateways/repositories/bookingRepository';
import { BookUber } from '../../../business-logic/usecases/bookUber';
import { DeterministicDateProvider } from '../../secondary/gateways/date-provision/deterministicDateProvider';
import { FakeAddressGeolocator } from '../../secondary/gateways/address-geolocation/fakeAddressGeolocator';
import { Traveller } from '../../../business-logic/domain/traveller';
import { FakeUuidGenerator } from '../../secondary/gateways/uuid-generation/fakeUuidGenerator';
import { InMemoryBookingRepository } from '../../secondary/gateways/repositories/fake/inMemoryBookingRepository';
import { InMemoryTravellerRepository } from '../../secondary/gateways/repositories/fake/inMemoryTravellerRepository';

describe('BookingController', () => {
  let bookingController: BookingController;
  let bookingRepository: BookingRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule(
      UberLightModuleConfig,
    ).compile();

    bookingController = app.get<BookingController>(BookingController);
    bookingRepository = app.get<BookingRepository>('bookingRepository');
  });

  describe('Bookings', () => {
    it('should book an uber intra-muros', async () => {
      await bookingController.bookAnUber({
        travellerId: '123abc',
        startPoint: '8 avenue Foch 75008 Paris',
        endPoint: '10 rue de Courcelles 75008 Aubervilliers',
      });
      expect((bookingRepository as InMemoryBookingRepository).bookings).toEqual(
        [
          {
            id: '777ddd',
            travellerId: '123abc',
            startPoint: '8 avenue Foch 75008 Paris',
            endPoint: '10 rue de Courcelles 75008 Aubervilliers',
            price: 18,
          },
        ],
      );
    });
  });
});

const UberLightModuleConfig = {
  imports: [],
  controllers: [BookingController],
  providers: [
    {
      provide: BookUber,
      useFactory: (
        bookingRepository,
        uuidGenerator,
        addressGeolocator,
        travellerRepository,
      ) => {
        const dateProvider = new DeterministicDateProvider();
        dateProvider.dateNow = new Date(2009, 3, 4);
        return new BookUber(
          bookingRepository,
          uuidGenerator,
          addressGeolocator,
          travellerRepository,
          dateProvider,
        );
      },
      inject: [
        'bookingRepository',
        'uuidGenerator',
        'addressGeolocator',
        'travellerRepository',
      ],
    },
    {
      provide: 'bookingRepository',
      useClass: InMemoryBookingRepository,
    },
    {
      provide: 'uuidGenerator',
      useFactory: () => {
        const fakeUuidGenerator = new FakeUuidGenerator();
        fakeUuidGenerator.nextUUID = '777ddd';
        return fakeUuidGenerator;
      },
    },
    {
      provide: 'addressGeolocator',
      useClass: FakeAddressGeolocator,
    },
    {
      provide: 'travellerRepository',
      useFactory: () => {
        const travellerRepository = new InMemoryTravellerRepository();
        travellerRepository.feedWith(
          new Traveller({
            id: '123abc',
            birthDate: new Date(2009, 3, 4),
          }),
        );
        return travellerRepository;
      },
    },
  ],
};
