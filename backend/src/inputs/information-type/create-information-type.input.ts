import { Field, ID, InputType } from 'type-graphql';

import { InformationType, InformationTypeEnum } from '../../models';

@InputType()
export class CreateInformationTypeInput implements Partial<InformationType> {
  @Field(() => ID, { nullable: true })
  public collectionId: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public displayName?: string;

  @Field({ nullable: true })
  public externalLink?: string;

  @Field()
  public identifier!: string;

  @Field(() => InformationTypeEnum)
  public type!: InformationTypeEnum;
}
