import { Booking } from '../../../../../business-logic/domain/booking';
import { BookingDBEntity } from './bookingDBEntity';
import { KnexBookingRepository } from './knexBookingRepository';
import { resetDB, sqlConnection } from '../../../../../../../test/initDBTest';

describe('Knex booking repository', () => {
  let bookingRepository: KnexBookingRepository;

  beforeEach(async () => {
    await resetDB(sqlConnection);
    bookingRepository = new KnexBookingRepository(sqlConnection);
  });

  it('can save a booking', async () => {
    const booking: Booking = {
      id: '82fc571b-1089-44a8-bc3e-14011aefd779',
      travellerId: 'd63ca86c-b726-4cdc-a0f0-854527c81518',
      startPoint: '8 avenue Foch 75008 Paris',
      endPoint: "10 avenue de l'Opéra 75009 Paris",
      price: 30,
    };
    await bookingRepository.save(booking);
    const savedBooking = await sqlConnection<BookingDBEntity>('bookings')
      .select(['id', 'traveller_id', 'start_point', 'end_point', 'price'])
      .where({ id: booking.id })
      .first();
    expect(savedBooking.id).toEqual('82fc571b-1089-44a8-bc3e-14011aefd779');
    expect(savedBooking.traveller_id).toEqual(
      'd63ca86c-b726-4cdc-a0f0-854527c81518',
    );
    expect(savedBooking.start_point).toEqual('8 avenue Foch 75008 Paris');
    expect(savedBooking.end_point).toEqual("10 avenue de l'Opéra 75009 Paris");
    expect(+savedBooking.price).toEqual(30);
  });

  afterAll(async () => {
    await sqlConnection.destroy();
  });
});
