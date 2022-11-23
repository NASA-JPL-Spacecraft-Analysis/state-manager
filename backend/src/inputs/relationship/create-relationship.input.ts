import { Field, ID, InputType } from 'type-graphql';

import { Relationship } from '../../models';

@InputType()
export class CreateRelationshipInput implements Partial<Relationship> {
  @Field(() => ID, { nullable: true })
  public collectionId: string;

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
