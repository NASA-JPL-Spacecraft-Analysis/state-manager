import { Field, ID, InputType } from 'type-graphql';

import { InformationTypeEnum, Relationship } from '../../models';

@InputType()
export class UpdateRelationshipInput implements Partial<Relationship> {
  @Field({ nullable: true })
  public description: string;

  @Field(() => ID)
  public id!: string;

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
