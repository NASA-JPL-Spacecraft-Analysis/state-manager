import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { IdentifierType } from './identifier-type';

@Entity('events')
@ObjectType()
export class Event extends IdentifierType {
  @Field(() => String, { nullable: true })
  @Column({ default: null, nullable: true })
  public description?: string;
}

export const eventTypes: Set<string> = new Set([
  'evr',
  'predict_event',
  'command_instance',
  'activity_instance',
  'user'
]);
