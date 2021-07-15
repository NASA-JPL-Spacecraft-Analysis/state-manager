import { Field, ID, InputType } from 'type-graphql';
import { CreateConstraintInput } from './create-constraint.input';

@InputType()
export class CreateConstraintsInput {
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => [ CreateConstraintInput ])
  public constraints!: CreateConstraintInput[];
}
