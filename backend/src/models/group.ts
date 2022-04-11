import { createUnionType, Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { Event } from './event';
import { GroupMapping } from './group-mapping';
import { InformationType } from './information-type';
import { Node } from './node';
import { State } from './state';

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

  @Field(() => [ GroupMapping ])
  public groupMappings: GroupMapping[];
}

/**
 * TODO: This type should support Commands and Constraints as well. The
 * front-end should be updated as well to reflect that.
 */
export type GroupType =
  Event |
  Group |
  InformationType |
  State;

export const GroupMappingUnion = createUnionType({
  name: 'GroupMappingUnion',
  types: () => [ Event, Group, InformationType, State ] as const,
  resolveType: value => {
    if (value instanceof Event) {
      return Event;
    }

    if (value instanceof Group) {
      return Group;
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
