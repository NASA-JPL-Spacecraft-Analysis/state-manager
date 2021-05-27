import { Field, ID, InputType } from 'type-graphql';

import { Relationship } from '../../models';

@InputType()
export class UploadRelationshipInput implements Partial<Relationship> {
  @Field(() => ID, { nullable: true })
  public collectionId: string;

  @Field({ nullable: true })
  public description: string;

  @Field()
  public displayName!: string;

  @Field()
  public subjectIdentifier!: string;

  @Field()
  public subjectType!: string;

  @Field(() => ID, { nullable: true })
  public subjectTypeId?: string;

  @Field()
  public targetIdentifier!: string;

  @Field()
  public targetType!: string;

  @Field(() => ID, { nullable: true })
  public targetTypeId?: string;
}
