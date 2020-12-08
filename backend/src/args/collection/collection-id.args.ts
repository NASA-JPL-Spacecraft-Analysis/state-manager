import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class CollectionIdArgs {
  @Field(() => ID)
  public collectionId!: string;
}
