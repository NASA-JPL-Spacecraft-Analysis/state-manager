import { InputType, Field, ID } from 'type-graphql';

import { Constraint } from '../../models';

@InputType()
export class UpdateConstraintInput implements Partial<Constraint> {
  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public displayName?: string;

  @Field({ nullable: true })
  public editable?: boolean;

  @Field({ nullable: true })
  public externalLink?: string;

  @Field(() => ID)
  public id!: string;

  @Field()
  public identifier!: string;

  @Field()
  public type!: string;

  @Field({ nullable: true })
  public version?: string;
}
