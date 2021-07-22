import { Field, ID, InputType } from 'type-graphql';

import { CreateCommandArgumentInput } from './create-command-argument.input';

@InputType()
export class CreateCommandArgumentsInput {
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => [ CreateCommandArgumentInput ])
  public commandArguments!: CreateCommandArgumentInput[];
}
