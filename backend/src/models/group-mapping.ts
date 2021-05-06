import { createUnionType, Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { Event } from './event';
import { InformationType } from './information-type';
import { Node } from './node';
import { State } from './state';

@Entity('group_mapping')
@ObjectType()
export class GroupMapping extends Node {
  @Field(() => ID)
  @Column()
  public groupId!: string;

  @Field(() => GroupMappingItemUnion, { nullable: true })
  public item?: typeof GroupMappingItemUnion;

  @Field(() => ID)
  @Column()
  public itemId!: string;

  @Column()
  @Field({ nullable: true })
  public sortOrder?: number;
}

export const GroupMappingItemUnion = createUnionType({
  name: 'GroupMappingItemUnion',
  types: () => [ Event, InformationType, State ] as const,
  resolveType: value => {
    if (value instanceof Event) {
      return Event;
    }

    if (value instanceof InformationType) {
      return InformationType;
    }

    if (value instanceof State) {
      return State;
    }

    return undefined;
  }
});
