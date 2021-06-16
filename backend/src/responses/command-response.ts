import { Field, ObjectType } from 'type-graphql';

import { Command } from '../models';
import { Response } from './response';

@ObjectType()
export class CommandResponse extends Response {
  @Field(() => Command, { nullable: true })
  public command?: Command;
}

@ObjectType()
export class CommandsResponse extends Response {
  @Field(() => [ Command ], { nullable: true })
  public commands?: Command[];
}
