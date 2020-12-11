import { Field, ID, InputType } from 'type-graphql';

import { StateEnumerationInput } from './state-enumeration.input';

@InputType()
export class SaveEnumerationsInput {
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => [ StateEnumerationInput ])
  public enumerations!: StateEnumerationInput[];
}
