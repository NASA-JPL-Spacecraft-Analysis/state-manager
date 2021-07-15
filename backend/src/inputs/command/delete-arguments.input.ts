import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class DeleteArgumentsInput {
  @Field(() => ID)
  public commandId!: string;

  @Field(() => [ ID ])
  public deletedArgumentIds!: string[];
}
