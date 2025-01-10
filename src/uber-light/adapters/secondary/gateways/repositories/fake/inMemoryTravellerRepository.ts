import { Traveller } from '../../../../../business-logic/domain/traveller';
import { TravellerRepository } from '../../../../../business-logic/gateways/repositories/travellerRepository';

export class InMemoryTravellerRepository implements TravellerRepository {
  private _travellers: Traveller[] = [];

  async byId(travellerId: string): Promise<Traveller> {
    return this._travellers.find((t) => t.id === travellerId);
  }

  get travellers(): Traveller[] {
    return this._travellers;
  }

  feedWith(...travellers: Traveller[]) {
    this._travellers = travellers;
  }
}
