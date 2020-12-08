import { Entity, Column } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Event } from './event';

@Entity('event_history')
@ObjectType()
export class EventHistory extends Event {
  @Field(() => ID)
  @Column()
  public eventId: string;

  @Field(() => Date)
  @Column()
  public updated: Date;
}
