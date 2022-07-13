import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { AllTypesUnion } from './all-types-union';

import { Node } from './node';

@Entity('group_mapping')
@ObjectType()
export class GroupMapping extends Node {
  @Field(() => ID)
  @Column()
  public groupId!: string;

  @Field(() => AllTypesUnion, { nullable: true })
  public item?: typeof AllTypesUnion;

  @Field(() => ID)
  @Column()
  public itemId!: string;

  @Column()
  @Field({ nullable: true })
  public sortOrder?: number;
}
