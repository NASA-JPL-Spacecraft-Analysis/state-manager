import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class CollectionIdTypeArgs {
  @Field(() => ID)
  public collectionId!: string;

  @Field()
  public type!: string;
}
