import { Entity } from 'typeorm';
import { ObjectType } from 'type-graphql';

import { IdentifierType } from './identifier-type';

@Entity({
  name: 'information_types',
  orderBy: {
    identifier: 'ASC'
  }
})
@ObjectType()
export class InformationType extends IdentifierType {}

export const informationTypes: Set<string> = new Set([
  'goal',
  'model'
]);
