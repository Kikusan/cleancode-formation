import { UUIDGenerator } from '../../../../business-logic/gateways/uuid-generation/uuidGenerator';
import { v4 as uuidv4 } from 'uuid';

export class RandomUuidGenerator implements UUIDGenerator {
  generate(): string {
    return uuidv4();
  }
}
