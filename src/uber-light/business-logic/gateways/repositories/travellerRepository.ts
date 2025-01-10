import { Traveller } from '../../domain/traveller';

export interface TravellerRepository {
  byId(travellerId: string): Promise<Traveller | undefined>;
}
