import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { IdentifierType } from './identifier-type';
import { CommandArgument } from './command-argument';

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
