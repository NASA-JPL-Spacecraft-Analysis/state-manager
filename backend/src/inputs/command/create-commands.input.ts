import { Field, ID, InputType } from 'type-graphql';
import { CreateCommandInput } from './create-command.input';

@InputType()
export class CreateCommandsInput {
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => [ CreateCommandInput ])
  public commands!: CreateCommandInput[];
}
