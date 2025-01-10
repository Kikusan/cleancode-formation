import { DateProvider } from '../../../../business-logic/gateways/date-provision/dateProvider';

export class DeterministicDateProvider implements DateProvider {
  private _dateNow: Date;

  now(): Date {
    return this._dateNow;
  }

  set dateNow(value: Date) {
    this._dateNow = value;
  }
}
