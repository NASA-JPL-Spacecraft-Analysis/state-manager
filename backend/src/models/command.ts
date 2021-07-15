import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { IdentifierType } from './identifier-type';
import { Node } from './node';

@Entity('commands')
@ObjectType()
export class Command extends IdentifierType {
  @Field(() => [ CommandArgument ], { nullable: true })
  public arguments?: CommandArgument[];
}

/**
 * TODO: Do we need history for command arguments?
 * Is sort order required?
 */
@Entity('command_arguments')
@ObjectType()
export class CommandArgument extends Node {
  @Column()
  @Field(() => ID)
  public commandId!: string;

  @Column()
  @Field()
  public name!: string;

  @Column()
  @Field({ nullable: true })
  public sortOrder?: number;
}

@Entity('command_history')
@ObjectType()
export class CommandHistory extends Command {
  @Column()
  @Field(() => ID)
  public commandId!: string;

  @Column()
  @Field(() => Date)
  public updated!: Date;
}

export const commandTypes: Set<string> = new Set([
  'command'
]);
