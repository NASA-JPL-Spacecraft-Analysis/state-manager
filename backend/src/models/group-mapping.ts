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
  public item?: Event | InformationType | State;

  @Field(() => ID)
  @Column()
  public itemId!: string;
}

export const GroupMappingItemUnion = createUnionType({
  name: 'GroupMappingItemType',
  types: () => [ Event, InformationType, State ] as const,
  resolveType: value => {
    if ('type' in value) {
      return InformationType;
    }

    if ('enumerations' in value) {
      return State;
    }

    if ('externalLink' in value) {
      return Event;
    }

    return undefined;
  }
});