import { createUnionType, Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { GroupMapping } from './group-mapping';
import { Node } from './node';

@Entity('groups')
@ObjectType()
export class Group extends Node {
  @Column()
  @Field(() => ID)
  public collectionId!: string;

  @Column()
  @Field()
  public enabled!: boolean;

  @Column()
  @Field()
  public identifier!: string;

  @Field(() => [GroupMapping])
  public groupMappings: GroupMapping[];
}
