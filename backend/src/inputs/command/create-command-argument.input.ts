import { Field, ID, InputType } from 'type-graphql';

import { CommandArgumentType } from '../../models';
import { CreateCommandArgumentEnumerationInput } from './create-command-argument-enumeration.input';

@InputType()
export class CreateCommandArgumentInput {
  @Field(() => ID, { nullable: true })
  public collectionId?: string;

  @Field()
  public commandIdentifier!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field(() => [CreateCommandArgumentEnumerationInput], { nullable: true })
  public enumerations?: CreateCommandArgumentEnumerationInput[];

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public sortOrder?: number;

  @Field(() => CommandArgumentType)
  public type!: CommandArgumentType;
}
