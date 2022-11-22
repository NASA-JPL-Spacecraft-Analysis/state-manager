import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { IdentifierType } from './identifier-type';
import { Node } from './node';

export enum CommandArgumentType {
  'Enumerated',
  'Numeric',
  'String'
}

@Entity({
  name: 'commands',
  orderBy: {
    identifier: 'ASC'
  }
})
@ObjectType()
export class Command extends IdentifierType {
  @Field(() => [CommandArgument], { nullable: true })
  public arguments?: CommandArgument[];
}

// TODO:: Is sort order required?

@Entity('command_arguments')
@ObjectType()
export class CommandArgument extends Node {
  @Column()
  @Field(() => ID)
  public collectionId!: string;

  @Column()
  @Field(() => ID)
  public commandId!: string;

  @Column()
  @Field({ nullable: true })
  public description?: string;

  @Column()
  @Field()
  public enums?: string;

  @Column()
  @Field()
  public name!: string;

  @Column()
  @Field({ nullable: true })
  public sortOrder?: number;

  @Column()
  @Field()
  public type!: CommandArgumentType;
}

@Entity('command_argument_history')
@ObjectType()
export class CommandArgumentHistory extends CommandArgument {
  @Column()
  @Field(() => ID)
  public commandArgumentId!: string;

  @Column()
  @Field(() => Date)
  public updated!: Date;
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
