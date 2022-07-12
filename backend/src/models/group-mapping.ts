import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { GroupMappingUnion } from './group';
import { Node } from './node';

@Entity('group_mapping')
@ObjectType()
export class GroupMapping extends Node {
  @Field(() => ID)
  @Column()
  public groupId!: string;

  @Field(() => GroupMappingUnion, { nullable: true })
  public item?: typeof GroupMappingUnion;

  @Field(() => ID)
  @Column()
  public itemId!: string;

  @Column()
  @Field({ nullable: true })
  public sortOrder?: number;
}
