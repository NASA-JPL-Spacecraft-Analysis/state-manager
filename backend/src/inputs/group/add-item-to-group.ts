import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class AddItemToGroupInput {
  @Field(() => ID)
  public groupId!: string;

  @Field(() => ID)
  public itemId!: string;
}