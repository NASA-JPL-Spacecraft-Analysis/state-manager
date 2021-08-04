import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class CreateStateEnumerationInput {
  @Field(() => ID)
  public collectionId!: string;

  @Field()
  public label!: string;

  @Field()
  public stateIdentifier!: string;

  @Field()
  public value!: string;
}
