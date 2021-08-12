import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class CreateStateEnumerationInput {
  @Field(() => ID, { nullable: true })
  public collectionId?: string;

  @Field()
  public label!: string;

  @Field()
  public stateIdentifier!: string;

  @Field()
  public value!: string;
}
