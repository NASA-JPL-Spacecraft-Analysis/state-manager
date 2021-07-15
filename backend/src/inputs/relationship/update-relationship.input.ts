import { Field, ID, InputType } from 'type-graphql';

import { Relationship } from '../../models';

@InputType()
export class UpdateRelationshipInput implements Partial<Relationship> {
  @Field({ nullable: true })
  public description: string;

  @Field(() => ID)
  public id!: string;

  @Field()
  public displayName!: string;

  @Field()
  public subjectType!: string;

  @Field(() => ID)
  public subjectTypeId!: string;

  @Field()
  public targetType!: string;

  @Field(() => ID)
  public targetTypeId!: string;
}
