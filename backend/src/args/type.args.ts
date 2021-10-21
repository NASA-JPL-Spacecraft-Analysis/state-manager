import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class TypeArgs {
  @Field(() => ID)
  public collectionId!: string;

  @Field()
  public identifier!: string;

  @Field()
  public type!: string;
}
