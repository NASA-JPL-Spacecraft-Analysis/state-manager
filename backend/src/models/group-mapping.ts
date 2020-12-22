import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { Node } from './node';

@Entity('group_mapping')
@ObjectType()
export class GroupMapping extends Node {
  @Field(() => ID)
  @Column()
  public groupId!: string;

  @Field(() => ID)
  @Column()
  public itemId!: string;
}