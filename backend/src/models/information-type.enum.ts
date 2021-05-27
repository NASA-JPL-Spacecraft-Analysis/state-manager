import { registerEnumType } from 'type-graphql';

export enum IdentifierTypeEnum {
  'constraint',
  'event',
  'flightRule',
  'informationType',
  'state'
}

registerEnumType(IdentifierTypeEnum, {
  name: 'IdentifierTypeEnum'
});
