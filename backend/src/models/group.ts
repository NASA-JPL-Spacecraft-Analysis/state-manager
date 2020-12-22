import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { GroupMapping } from './group-mapping';
import { Node } from './node';

@Entity('groups')
@ObjectType()
export class Group extends Node {
  @Field(() => ID)
  @Column()
  public collectionId!: string;

  @Field()
  @Column()
  public name!: string;

  @Field(() => [ GroupMapping ])
  public groupMappings: GroupMapping[];
}