import { DateProvider } from '../gateways/date-provision/dateProvider';
import { Trip } from './trip';

interface TravellerState {
  id: string;
  birthDate: Date;
}

export class Traveller {
  constructor(private _state: TravellerState) {}

  isBirthday(dateProvider: DateProvider): boolean {
    return (
      this._state.birthDate.getMonth() === dateProvider.now().getMonth() &&
      this._state.birthDate.getDate() === dateProvider.now().getDate()
    );
  }

  wantTrip(startPoint: string, endPoint: string) {
    return new Trip({ travellerId: this.id, startPoint, endPoint });
  }

  get id(): string {
    return this._state.id;
  }

  get birthDate(): Date {
    return this._state.birthDate;
  }
}
