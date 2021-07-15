import { Field, ID, InputType } from 'type-graphql';

import { Relationship } from '../../models';

@InputType()
export class CreateRelationshipInput implements Partial<Relationship> {
  @Field(() => ID, { nullable: true })
  public collectionId: string;

  @Field({ nullable: true })
  public description: string;

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
