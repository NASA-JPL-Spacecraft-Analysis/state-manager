import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class CreateCommandArgumentInput {
  @Field(() => ID)
  public collectionId!: string;

  @Field()
  public commandIdentifier!: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public sortOrder?: number;
}
