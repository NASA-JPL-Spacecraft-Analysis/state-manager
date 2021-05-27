import { Entity } from 'typeorm';
import { ObjectType } from 'type-graphql';

import { IdentifierType } from './identifier-type';

@Entity('information_types')
@ObjectType()
export class InformationType extends IdentifierType {}

export const informationTypes: Set<string> = new Set([
  'goal',
  'model'
]);
