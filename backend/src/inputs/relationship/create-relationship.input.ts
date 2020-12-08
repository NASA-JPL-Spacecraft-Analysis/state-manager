import { Field, ID, InputType } from 'type-graphql';

import { InformationTypeEnum, Relationship } from '../../models';

@InputType()
export class CreateRelationshipInput implements Partial<Relationship> {
  @Field(() => ID, { nullable: true })
  public collectionId: string;

  @Field({ nullable: true })
  public description: string;

  @Field()
  public displayName!: string;

  @Field(() => InformationTypeEnum)
  public subjectType!: InformationTypeEnum;

  @Field(() => ID)
  public subjectTypeId!: string;

  @Field(() => InformationTypeEnum)
  public targetType!: InformationTypeEnum;

  @Field(() => ID)
  public targetTypeId!: string;
}
