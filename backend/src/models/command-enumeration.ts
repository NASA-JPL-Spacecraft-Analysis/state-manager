import { Entity, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Node } from './node';
import { Command } from './command';
import { CommandArgument } from './command-argument';

@Entity('command_argument_enumerations')
@ObjectType()
export class CommandArgumentEnumeration extends Node {
  @Field(() => ID)
  @Column()
  public collectionId!: string;

  @Field(() => Command)
  public command?: Command;

  @Field(() => CommandArgument)
  public commandArgument?: CommandArgument;

  @Field(() => ID)
  @Column()
  public commandArgumentId!: string;

  @Field()
  @Column()
  public label!: string;

  @Field()
  @Column()
  public value!: number;
}

