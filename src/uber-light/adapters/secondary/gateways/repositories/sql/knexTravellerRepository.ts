import { TravellerRepository } from '../../../../../business-logic/gateways/repositories/travellerRepository';
import { Traveller } from '../../../../../business-logic/domain/traveller';
import { Knex } from 'knex';
import { TravellerDBEntity } from './travellerDBEntity';

export class KnexTravellerRepository implements TravellerRepository {
  constructor(private sqlConnection: Knex) {}

  async byId(travellerId: string): Promise<Traveller | undefined> {
    const savedTraveller = await this.sqlConnection<TravellerDBEntity>(
      'travellers',
    )
      .select('id', 'birth_date')
      .where({ id: travellerId })
      .first();
    if (!savedTraveller) return;
    return new Traveller({
      id: savedTraveller.id,
      birthDate: savedTraveller.birth_date,
    });
  }
}
