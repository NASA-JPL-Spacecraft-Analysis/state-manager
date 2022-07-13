import { Field, ID, InputType } from 'type-graphql';

import { Relationship } from '../../models';

@InputType()
export class UpdateRelationshipInput implements Partial<Relationship> {
  @Field(() => ID)
  public id!: string;

  @Field()
  public displayName!: string;

  @Field({ nullable: true })
  public subjectToTargetDescription: string;

  @Field()
  public subjectType!: string;

  @Field(() => ID)
  public subjectTypeId!: string;

  @Field({ nullable: true })
  public targetToSubjectDescription: string;

  @Field()
  public targetType!: string;

  @Field(() => ID)
  public targetTypeId!: string;
}
