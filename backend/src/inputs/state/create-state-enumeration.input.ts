import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateStateEnumerationInput {
  @Field()
  public label!: string;

  @Field()
  public stateIdentifier!: string;

  @Field()
  public value!: string;
}
