import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class DeleteEnumerationsInput {
  @Field(() => [ ID ])
  public enumerationIds!: string[];

  @Field(() => ID)
  public stateId!: string;
}
