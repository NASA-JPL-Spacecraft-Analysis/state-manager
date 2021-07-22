import { Field, ID, ObjectType } from 'type-graphql';

import { Command, CommandArgument } from '../models';
import { Response } from './response';

@ObjectType()
export class CommandResponse extends Response {
  @Field(() => Command, { nullable: true })
  public command?: Command;
}

@ObjectType()
export class CommandArgumentResponse extends Response {
  @Field(() => [ CommandArgument ], { nullable: true })
  public commandArguments?: CommandArgument[];
}

@ObjectType()
export class CommandsResponse extends Response {
  @Field(() => [ Command ], { nullable: true })
  public commands?: Command[];
}

@ObjectType()
export class DeleteArgumentResponse extends Response {
  @Field(() => [ ID ], { nullable: true })
  public deletedArgumentIds?: string[];
}
