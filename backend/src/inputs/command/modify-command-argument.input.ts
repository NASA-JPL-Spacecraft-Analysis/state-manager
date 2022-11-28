import { Field, ID, InputType } from 'type-graphql';

import { CommandArgument, CommandArgumentType } from '../../models';

@InputType()
export class ModifyCommandArgument implements Partial<CommandArgument> {
  @Field(() => ID, { nullable: true })
  public collectionId?: string;

  @Field(() => ID, { nullable: true })
  public commandId?: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public enums?: string;

  @Field(() => ID, { nullable: true })
  public id?: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public sortOrder?: number;

  @Field(() => CommandArgumentType)
  public type!: CommandArgumentType;
}
