import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class IdentifierArgs {
  @Field(() => ID, { nullable: true })
  public collectionId?: string;

  @Field(() => ID, { nullable: true })
  public id?: string;

  @Field({ nullable: true })
  public identifier?: string;
}
