import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { CommandArgumentEnumeration } from './command-enumeration';
import { Node } from './node';

export enum CommandArgumentType {
  Enumerated = 'Enumerated',
  Numeric = 'Numeric',
  String = 'String'
}

registerEnumType(CommandArgumentType, {
  name: 'CommandArgumentType'
});


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

  @Field(() => [CommandArgumentEnumeration], { nullable: true })
  public enumerations?: CommandArgumentEnumeration[];

  @Column()
  @Field()
  public name!: string;

  @Column()
  @Field({ nullable: true })
  public sortOrder?: number;

  @Column()
  @Field(() => CommandArgumentType)
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
