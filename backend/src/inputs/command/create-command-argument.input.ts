import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateCommandArgumentInput {
  @Field()
  public commandIdentifier!: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public sortOrder?: number;
}
