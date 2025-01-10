import { UUIDGenerator } from '../../../../business-logic/gateways/uuid-generation/uuidGenerator';

export class FakeUuidGenerator implements UUIDGenerator {
  private _nextUUID: string;

  generate(): string {
    return this._nextUUID;
  }

  set nextUUID(value: string) {
    this._nextUUID = value;
  }
}
