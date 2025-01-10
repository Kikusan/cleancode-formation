import { Booking } from '../../../../../business-logic/domain/booking';
import { BookingRepository } from '../../../../../business-logic/gateways/repositories/bookingRepository';

export class InMemoryBookingRepository implements BookingRepository {
  private _bookings: Booking[] = [];

  async save(booking: Booking): Promise<void> {
    this._bookings.push(booking);
  }

  get bookings(): Booking[] {
    return this._bookings;
  }
}
