import { Field, ID, InputType } from 'type-graphql';

import { CreateEventInput } from './create-event.input';

@InputType()
export class CreateEventsInput {
  @Field(() => ID)
  public collectionId: string;

  @Field(() => [ CreateEventInput ])
  public events: CreateEventInput[];
}
