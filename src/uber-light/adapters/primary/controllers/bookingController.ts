import { Body, Controller, Inject, Post } from '@nestjs/common';
import { BookUber } from '../../../business-logic/usecases/bookUber';
import { BookingRepository } from '../../../business-logic/gateways/repositories/bookingRepository';

@Controller('/bookings')
export class BookingController {
  constructor(
    private bookUber: BookUber,
    @Inject('bookingRepository') private bookingRepository: BookingRepository,
  ) {}

  @Post()
  async bookAnUber(
    @Body() bookRequestParams: BookRequestParams,
  ): Promise<void> {
    const { travellerId, startPoint, endPoint } = bookRequestParams;
    await this.bookUber.handle(travellerId, startPoint, endPoint);
    // console.log((this.bookingRepository as InMemoryBookingRepository).bookings);
    return;
  }
}

interface BookRequestParams {
  travellerId: string;
  startPoint: string;
  endPoint: string;
}
