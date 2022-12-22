import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class CreateCommandArgumentEnumerationInput {
  @Field()
  public label!: string;

  @Field()
  public value!: number;
}
