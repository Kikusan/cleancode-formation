import { Booking } from '../../domain/booking';

export interface BookingRepository {
  save(booking: Booking): Promise<void>;
}
