import { DateProvider } from '../../../../business-logic/gateways/date-provision/dateProvider';

export class RealDateProvider implements DateProvider {
  now(): Date {
    return new Date();
  }
}
