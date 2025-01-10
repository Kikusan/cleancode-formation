import { Knex } from 'knex';
import { BookingRepository } from '../../../../../business-logic/gateways/repositories/bookingRepository';
import { Booking } from '../../../../../business-logic/domain/booking';
import { BookingDBEntity } from './bookingDBEntity';

export class KnexBookingRepository implements BookingRepository {
  constructor(private sqlConnection: Knex) {}

  save(booking: Booking): Promise<void> {
    return this.sqlConnection<BookingDBEntity>('bookings').insert({
      id: booking.id,
      traveller_id: booking.travellerId,
      start_point: booking.startPoint,
      end_point: booking.endPoint,
      price: booking.price,
    });
  }
}
