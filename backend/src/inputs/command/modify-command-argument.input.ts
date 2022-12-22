import { Field, ID, InputType } from 'type-graphql';

import { CommandArgumentType } from '../../models';
import { CreateCommandArgumentEnumerationInput } from './create-command-argument-enumeration.input';

@InputType()
export class ModifyCommandArgument {
  @Field(() => ID, { nullable: true })
  public collectionId?: string;

  @Field(() => ID, { nullable: true })
  public commandId?: string;

  @Field({ nullable: true })
  public description?: string;

  @Field(() => [CreateCommandArgumentEnumerationInput], { nullable: true })
  public enumerations?: CreateCommandArgumentEnumerationInput[];

  @Field(() => ID, { nullable: true })
  public id?: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public sortOrder?: number;

  @Field(() => CommandArgumentType)
  public type!: CommandArgumentType;
}
