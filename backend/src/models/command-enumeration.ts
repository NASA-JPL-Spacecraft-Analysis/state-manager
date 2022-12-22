import { Entity, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Node } from './node';

@Entity('command_argument_enumerations')
@ObjectType()
export class CommandArgumentEnumeration extends Node {
  @Field(() => ID)
  @Column()
  public collectionId!: string;

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

