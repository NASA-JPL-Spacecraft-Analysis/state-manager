import { Field, ID, InputType } from 'type-graphql';

import { Command } from '../../models';

@InputType()
export class CreateCommandInput implements Partial<Command> {
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
}
