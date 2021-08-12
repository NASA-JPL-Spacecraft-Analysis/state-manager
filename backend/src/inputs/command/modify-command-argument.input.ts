import { Field, ID, InputType } from 'type-graphql';

import { CommandArgument } from '../../models';

@InputType()
export class ModifyCommandArgument implements Partial<CommandArgument> {
  @Field(() => ID, { nullable: true })
  public collectionId?: string;

  @Field(() => ID, { nullable: true })
  public commandId?: string;

  @Field(() => ID, { nullable: true })
  public id?: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public sortOrder?: number;
}
