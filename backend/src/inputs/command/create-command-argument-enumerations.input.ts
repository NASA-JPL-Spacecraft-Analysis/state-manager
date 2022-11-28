import { Field, ID, InputType } from 'type-graphql';

import { CreateCommandArgumentEnumerationInput } from './create-command-argument-enumeration.input';

@InputType()
export class CreateCommandArgumentEnumerationsInput {
  @Field(() => ID)
  public commandArgumentId!: string;

  @Field(() => [CreateCommandArgumentEnumerationInput])
  public commandArgumentEnumerations!: CreateCommandArgumentEnumerationsInput[];
}
