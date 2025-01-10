import { Booking } from './booking';
import { Traveller } from './traveller';
import { DateProvider } from '../gateways/date-provision/dateProvider';

interface TripState {
  travellerId: string;
  startPoint: string;
  endPoint: string;
}

export class Trip {
  constructor(private state: TripState) {}

  book(
    bookingId,
    isStartInParis: boolean,
    isEndInParis: boolean,
    traveller: Traveller,
    dateProvider: DateProvider,
  ): Booking {
    return {
      id: bookingId,
      travellerId: traveller.id,
      startPoint: this.state.startPoint,
      endPoint: this.state.endPoint,
      price: this.determineBookingPrice(
        isStartInParis,
        isEndInParis,
        dateProvider,
        traveller,
      ),
    };
  }

  private determineBookingPrice = (
    isStartInParis: boolean,
    isEndInParis: boolean,
    dateProvider: DateProvider,
    traveller: Traveller,
  ) => {
    let price = 0;
    if (isStartInParis && isEndInParis) price = 30;
    else if (!isEndInParis) {
      price = 50;
      if (traveller.isBirthday(dateProvider)) {
        price = 18;
      }
    }
    return price;
  };
}
