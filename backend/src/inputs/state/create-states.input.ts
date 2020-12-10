import { Field, ID, InputType } from 'type-graphql';

import { CreateStateInput } from './create-state.input';

@InputType()
export class CreateStatesInput {
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => [ CreateStateInput ])
  public states!: CreateStateInput[];
}
