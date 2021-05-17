import { Field, ObjectType } from 'type-graphql';
import { Event } from '../models';

import { Response } from './response';

@ObjectType()
export class EventResponse extends Response {
  @Field(() => Event, { nullable: true })
  public event?: Event;
}

@ObjectType()
export class EventsResponse extends Response {
  @Field(() => [ Event ], { nullable: true })
  public events?: Event[];
}
