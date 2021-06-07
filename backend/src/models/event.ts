import { Column, Entity } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { IdentifierType } from './identifier-type';

@Entity('events')
@ObjectType()
export class Event extends IdentifierType {}

@Entity({
  name: 'event-history',
  orderBy: {
    updated: 'DESC'
  }
})
@ObjectType()
export class EventHistory extends Event {
  @Column()
  @Field(() => ID)
  public eventId!: string;

  @Column()
  @Field(() => Date)
  public updated!: Date;
}

export const eventTypes: Set<string> = new Set([
  'activity_instance',
  'command_instance',
  'evr',
  'predict_event',
  'user'
]);
