import { InputType, Field, ID } from 'type-graphql';

import { ModifyCommandArgument } from './modify-command-argument.input';

@InputType()
export class UpdateCommandInput {
  @Field(() => [ ModifyCommandArgument ], { nullable: true })
  public arguments?: ModifyCommandArgument[];

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public displayName?: string;

  @Field({ nullable: true })
  public editable?: boolean;

  @Field({ nullable: true })
  public externalLink?: string;

  @Field(() => ID)
  public id!: string;

  @Field()
  public identifier!: string;

  @Field()
  public type!: string;
}
