import { Field, ID, InputType } from 'type-graphql';

import { Constraint } from '../../models';

@InputType()
export class CreateConstraintInput implements Partial<Constraint> {
  @Field(() => ID)
  public collectionId!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field()
  public displayName!: string;

  @Field({ nullable: true })
  public externalLink?: string;

  @Field()
  public identifier!: string;

  @Field()
  public type!: string;
}
