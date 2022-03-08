import { Field, ID, InputType } from 'type-graphql';

import { ModifyCommandArgument } from './modify-command-argument.input';

@InputType()
export class CreateCommandInput {
  @Field(() => [ ModifyCommandArgument ], { nullable: true })
  public arguments?: ModifyCommandArgument[];

  @Field(() => ID)
  public collectionId!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field()
  public displayName!: string;

  @Field()
  public editable!: boolean;

  @Field({ nullable: true })
  public externalLink?: string;

  @Field()
  public identifier!: string;

  @Field()
  public type!: string;
}
