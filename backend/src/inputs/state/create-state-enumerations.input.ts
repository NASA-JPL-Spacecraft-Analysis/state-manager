import { Field, ID, InputType } from 'type-graphql';

import { CreateStateEnumerationInput } from './create-state-enumeration.input';

@InputType()
export class CreateStateEnumerationsInput {
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => [ CreateStateEnumerationInput ])
  public stateEnumerations!: CreateStateEnumerationInput[];
}
