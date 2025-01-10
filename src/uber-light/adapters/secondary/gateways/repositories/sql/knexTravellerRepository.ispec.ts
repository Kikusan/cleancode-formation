import { Traveller } from '../../../../../business-logic/domain/traveller';
import { KnexTravellerRepository } from './knexTravellerRepository';
import { TravellerRepository } from '../../../../../business-logic/gateways/repositories/travellerRepository';
import { TravellerDBEntity } from './travellerDBEntity';
import { resetDB, sqlConnection } from '../../../../../../../test/initDBTest';

describe('Knex traveller repository', () => {
  let travellerRepository: TravellerRepository;

  beforeEach(async () => {
    await resetDB(sqlConnection);
    travellerRepository = new KnexTravellerRepository(sqlConnection);
  });

  it('can find a traveller by its id', async () => {
    const traveller = new Traveller({
      id: 'd63ca86c-b726-4cdc-a0f0-854527c81518',
      birthDate: new Date(2009, 3, 4),
    });
    await sqlConnection<TravellerDBEntity>('travellers').insert({
      id: traveller.id,
      birth_date: traveller.birthDate,
    });
    const savedTraveller: Traveller | undefined =
      await travellerRepository.byId(traveller.id);
    expect(savedTraveller.id).toEqual('d63ca86c-b726-4cdc-a0f0-854527c81518');
    expect(savedTraveller.birthDate).toEqual(new Date(2009, 3, 4));
  });

  afterAll(async () => {
    await sqlConnection.destroy();
  });
});
